#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Genera el QR de las rutinas y las piezas listas para imprimir.

    pip install segno pillow
    python scripts/generar-qr.py

Salida en  qr-cliente/  :
    QR-rutinas-warriors.svg / .png / .pdf   -> QR pelado (negro sobre blanco)
    Cartel-rutinas-A4.pdf / .png            -> cartel branded A4
    Cartel-rutinas-A5.pdf / .png            -> cartel branded A5
    Sticker-rutinas-10x10.pdf / .png        -> sticker cuadrado para mostrador
    LEEME.txt                               -> instrucciones para la imprenta

Si algún día cambia la URL destino, se edita URL acá, se vuelve a correr y se
reimprime. Mientras la URL no cambie, el QR impreso sirve para siempre.
"""

from pathlib import Path

import segno
from PIL import Image, ImageDraw, ImageFont

# ── Configuración ───────────────────────────────────────────────────────────
URL = "https://www.warriorssportarg.com.ar/rutinas"

VERDE  = (126, 239, 8)
NEGRO  = (0, 0, 0)
BLANCO = (255, 255, 255)

RAIZ    = Path(__file__).resolve().parent.parent
FUENTES = Path(__file__).resolve().parent / "fonts"
SALIDA  = RAIZ / "qr-cliente"
LOGO    = RAIZ / "public" / "images" / "logo.jpg"

DPI = 300
A4  = (2480, 3508)   # 210 × 297 mm a 300 dpi
A5  = (1748, 2480)   # 148 × 210 mm a 300 dpi
CUA = (1181, 1181)   # 100 × 100 mm a 300 dpi


# ── Tipografías ─────────────────────────────────────────────────────────────
def bebas(px: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FUENTES / "BebasNeue-Regular.ttf"), px)


def mont(px: int, peso: str = "SemiBold") -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FUENTES / "Montserrat-Variable.ttf"), px)
    f.set_variation_by_name(peso)
    return f


# ── Utilidades de dibujo ────────────────────────────────────────────────────
def texto(draw, xy, txt, font, fill, tracking=0.0, anchor="mm"):
    """Dibuja texto centrado con letter-spacing opcional (Pillow no lo trae)."""
    if not tracking:
        draw.text(xy, txt, font=font, fill=fill, anchor=anchor)
        return

    anchos = [draw.textlength(c, font=font) for c in txt]
    total  = sum(anchos) + tracking * (len(txt) - 1)

    x, y = xy
    if anchor[0] == "m":
        x -= total / 2
    elif anchor[0] == "r":
        x -= total

    for c, w in zip(txt, anchos):
        draw.text((x, y), c, font=font, fill=fill, anchor="l" + anchor[1])
        x += w + tracking


def resplandor(lienzo, centro, radio, color, alpha_max):
    """Halo radial suave — se calcula chico y se escala, sale más parejo."""
    n = 160
    mascara = Image.new("L", (n, n), 0)
    px = mascara.load()
    c = (n - 1) / 2
    for j in range(n):
        for i in range(n):
            d = (((i - c) / c) ** 2 + ((j - c) / c) ** 2) ** 0.5
            if d < 1:
                px[i, j] = int(alpha_max * (1 - d) ** 2)

    lado = int(radio * 2)
    mascara = mascara.resize((lado, lado), Image.LANCZOS)
    capa = Image.new("RGB", (lado, lado), color)
    lienzo.paste(capa, (int(centro[0] - radio), int(centro[1] - radio)), mascara)


def pegar_qr(lienzo, centro, lado_max: int, ecc: str = "h"):
    """
    Pega el QR (negro sobre blanco, con zona de silencio reglamentaria)
    centrado en `centro`, lo más grande posible sin pasar de `lado_max`.

    El lado siempre termina siendo múltiplo exacto de la cantidad de módulos:
    si se escalara a un tamaño arbitrario, unos módulos quedarían de 12 px y
    otros de 13, y eso al imprimir se nota y complica la lectura.
    """
    qr      = segno.make(URL, error=ecc)
    modulos = qr.symbol_size(border=4)[0]
    escala  = max(1, lado_max // modulos)

    tmp = SALIDA / "_tmp_qr.png"
    qr.save(str(tmp), scale=escala, border=4, dark="black", light="white")
    im = Image.open(tmp).convert("RGB")
    tmp.unlink(missing_ok=True)

    lienzo.paste(im, (int(centro[0] - im.width // 2), int(centro[1] - im.height // 2)))
    return im.width


def pegar_logo(lienzo, centro_x: int, y: int, lado_px: int):
    """
    El logo es un JPG con fondo negro. Se pega usando su propio brillo como
    máscara, así el fondo se funde con el del cartel en vez de quedar como un
    recuadro gris recortado.
    """
    im = Image.open(LOGO).convert("RGB").resize((lado_px, lado_px), Image.LANCZOS)
    mascara = im.convert("L").point(lambda v: min(255, int(v * 3.2)))
    lienzo.paste(im, (centro_x - lado_px // 2, y), mascara)


# ── Cartel vertical (A4 / A5) ───────────────────────────────────────────────
def cartel(tam):
    W, H = tam
    s = W / A4[0]                       # todo se define en px de A4 y se escala

    def e(v):                           # escalar
        return int(round(v * s))

    im = Image.new("RGB", (W, H), NEGRO)
    resplandor(im, (W // 2, e(180)), e(1250), VERDE, 46)
    d = ImageDraw.Draw(im)

    # Barra superior
    d.rectangle([0, 0, W, e(20)], fill=VERDE)

    # Logo
    pegar_logo(im, W // 2, e(215), e(215))

    # Lockup de marca
    texto(d, (W / 2, e(545)), "WARRIORS", bebas(e(86)), BLANCO, tracking=e(9))
    texto(d, (W / 2, e(625)), "SPORT ARG", bebas(e(40)), VERDE,  tracking=e(26))

    # Titular
    texto(d, (W / 2, e(925)), "RUTINAS", bebas(e(400)), BLANCO, tracking=e(10))
    d.rounded_rectangle(
        [W / 2 - e(150), e(1105), W / 2 + e(150), e(1105) + e(11)],
        radius=e(6), fill=VERDE,
    )
    texto(d, (W / 2, e(1215)), "ESCANEÁ Y ENTRENÁ", mont(e(60), "Bold"), VERDE, tracking=e(14))

    # Panel blanco con el QR (siempre oscuro sobre claro: es lo que mejor escanea)
    panel = e(1560)
    px0, py0 = (W - panel) // 2, e(1320)
    d.rounded_rectangle([px0, py0, px0 + panel, py0 + panel], radius=e(56), fill=BLANCO)
    pegar_qr(im, (W // 2, py0 + panel // 2), e(1340))

    # Pie
    base = py0 + panel
    texto(d, (W / 2, base + e(120)), "warriorssportarg.com.ar/rutinas",
          mont(e(54), "Bold"), BLANCO)
    texto(d, (W / 2, base + e(210)), "Apuntá la cámara de tu celular al código",
          mont(e(42), "Medium"), (150, 150, 150))

    d.rectangle([W / 2 - e(420), H - e(300), W / 2 + e(420), H - e(300) + e(3)],
                fill=(38, 38, 38))
    texto(d, (W / 2, H - e(215)), "ELEGÍ TU NIVEL · SEGUÍ EL PLAN DEL DÍA",
          mont(e(38), "SemiBold"), VERDE, tracking=e(6))

    d.rectangle([0, H - e(20), W, H], fill=VERDE)
    return im


# ── Sticker cuadrado (mostrador / espejo) ───────────────────────────────────
def sticker(tam):
    W, H = tam
    s = W / CUA[0]

    def e(v):
        return int(round(v * s))

    im = Image.new("RGB", (W, H), NEGRO)
    resplandor(im, (W // 2, e(90)), e(620), VERDE, 42)
    d = ImageDraw.Draw(im)

    d.rectangle([0, 0, W, e(12)], fill=VERDE)

    pegar_logo(im, W // 2, e(52), e(100))

    texto(d, (W / 2, e(228)), "RUTINAS", bebas(e(108)), BLANCO, tracking=e(5))
    texto(d, (W / 2, e(295)), "ESCANEÁ Y ENTRENÁ", mont(e(24), "Bold"), VERDE, tracking=e(6))

    panel = e(640)
    px0, py0 = (W - panel) // 2, e(335)
    d.rounded_rectangle([px0, py0, px0 + panel, py0 + panel], radius=e(24), fill=BLANCO)
    pegar_qr(im, (W // 2, py0 + panel // 2), e(550))

    texto(d, (W / 2, py0 + panel + e(62)), "warriorssportarg.com.ar/rutinas",
          mont(e(27), "Bold"), BLANCO)

    d.rectangle([0, H - e(12), W, H], fill=VERDE)
    return im


# ── Main ────────────────────────────────────────────────────────────────────
def main():
    SALIDA.mkdir(exist_ok=True)

    qr = segno.make(URL, error="h")
    print(f"URL : {URL}")
    print(f"QR  : version {qr.version} / correccion {qr.error} / "
          f"{qr.symbol_size(border=0)[0]} modulos")

    # QR pelado, en vectorial y en mapa de bits
    qr.save(str(SALIDA / "QR-rutinas-warriors.svg"), scale=20, border=4,
            dark="black", light="white")
    qr.save(str(SALIDA / "QR-rutinas-warriors.pdf"), scale=20, border=4,
            dark="black", light="white")
    qr.save(str(SALIDA / "QR-rutinas-warriors.png"), scale=48, border=4,
            dark="black", light="white")

    piezas = [
        ("Cartel-rutinas-A4",     cartel(A4)),
        ("Cartel-rutinas-A5",     cartel(A5)),
        ("Sticker-rutinas-10x10", sticker(CUA)),
    ]
    for nombre, img in piezas:
        img.save(SALIDA / f"{nombre}.png", dpi=(DPI, DPI))
        img.save(SALIDA / f"{nombre}.pdf", "PDF", resolution=float(DPI))
        print(f"  OK {nombre}  ({img.width}x{img.height} px @ {DPI} dpi)")

    (SALIDA / "LEEME.txt").write_text(
        "WARRIORS SPORT ARG — QR de rutinas\n"
        "===================================\n\n"
        f"Todos los códigos de esta carpeta apuntan a:\n  {URL}\n\n"
        "QUÉ IMPRIMIR\n"
        "------------\n"
        "  Cartel-rutinas-A4.pdf      Cartel para pared o mostrador (21 × 29,7 cm)\n"
        "  Cartel-rutinas-A5.pdf      Media hoja, para varios puntos del gimnasio\n"
        "  Sticker-rutinas-10x10.pdf  Cuadrado de 10 × 10 cm para mostrador o espejo\n"
        "  QR-rutinas-warriors.svg    Solo el código, vectorial, por si el diseñador\n"
        "                             lo quiere meter en otra pieza\n\n"
        "Los .pdf son los archivos para la imprenta. Los .png son la misma pieza\n"
        "en imagen, para mandar por WhatsApp o subir a redes.\n\n"
        "RECOMENDACIONES\n"
        "---------------\n"
        "  · Imprimir al 100%, sin 'ajustar a la página'.\n"
        "  · No achicar el código a menos de 3 cm de lado.\n"
        "  · Dejar el marco blanco alrededor del código: es lo que permite leerlo.\n"
        "  · No cambiarle el color al código ni invertirlo. Negro sobre blanco es\n"
        "    lo que mejor lee cualquier celular.\n"
        "  · Colocar a la altura de los ojos y con buena luz.\n\n"
        "IMPORTANTE\n"
        "----------\n"
        "El código es fijo: mientras la dirección no cambie, sirve para siempre.\n"
        "Las rutinas de la página se pueden actualizar todas las veces que haga\n"
        "falta sin tocar el código impreso.\n",
        encoding="utf-8",
    )
    print(f"\nListo -> {SALIDA}")


if __name__ == "__main__":
    main()
