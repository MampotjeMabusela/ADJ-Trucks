"""Remove the dark box from the ADJ Trucks logo while keeping artwork."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "logo" / "adj-trucks-logo-source.png"
OUT = ROOT / "public" / "images" / "logo" / "adj-trucks-logo.png"
HEADER = ROOT / "public" / "images" / "logo" / "adj-trucks-logo-header.png"
CUT = ROOT / "public" / "images" / "logo" / "adj-trucks-logo-transparent.png"


def flood_outer_black(lum: np.ndarray, threshold: float = 20.0) -> np.ndarray:
    h, w = lum.shape
    outer = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if lum[y, x] < threshold:
                outer[y, x] = True
                queue.append((x, y))

    for y in range(h):
        for x in (0, w - 1):
            if not outer[y, x] and lum[y, x] < threshold:
                outer[y, x] = True
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not outer[ny, nx] and lum[ny, nx] < threshold:
                outer[ny, nx] = True
                queue.append((nx, ny))

    return outer


def build_foreground_mask(
    lum: np.ndarray,
    detail: np.ndarray,
    sat: np.ndarray,
    outer: np.ndarray,
) -> np.ndarray:
    # Grow from bright logo strokes only — avoids selecting the flat box matte.
    seed = (lum >= 132).astype(np.uint8)
    zone = cv2.dilate(
        seed,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (23, 23)),
        iterations=1,
    )

    keep = (zone > 0) & (lum >= 48) & (~outer)
    keep |= lum >= 145
    keep &= ~((lum < 112) & (sat < 0.11) & (detail < 8.5))
    return keep


def peel_halo(fg: np.ndarray, lum: np.ndarray, detail: np.ndarray) -> np.ndarray:
    m = fg.astype(np.uint8)
    kernel = np.ones((3, 3), np.uint8)

    for _ in range(40):
        eroded = cv2.erode(m, kernel, iterations=1)
        boundary = (m > 0) & (eroded == 0)
        if not boundary.any():
            break
        bad = boundary & ((lum < 118) | ((detail < 5.0) & (lum < 135)))
        if not bad.any():
            break
        m[bad] = 0

    return m.astype(bool)


def remove_flat_dark_matte(rgba: np.ndarray, lum: np.ndarray, detail: np.ndarray) -> np.ndarray:
    alpha = rgba[..., 3]
    flat_dark = (alpha > 0) & (lum < 112) & (detail < 8.0)
    semi_fringe = (alpha > 0) & (alpha < 255) & (lum < 118) & (detail < 9.0)
    rgba[flat_dark | semi_fringe] = (0, 0, 0, 0)
    return rgba


def largest_component(fg: np.ndarray) -> np.ndarray:
    mask = fg.astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
    if count <= 1:
        return fg
    largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    return labels == largest


def artwork_bounds(lum: np.ndarray) -> tuple[int, int, int, int]:
    ys, xs = np.where(lum > 95)
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def main() -> None:
    img = np.array(Image.open(SRC).convert("RGBA"))
    rgb = img[..., :3].astype(np.uint8)
    h, w = rgb.shape[:2]
    lum = (
        0.299 * rgb[..., 0].astype(np.float32)
        + 0.587 * rgb[..., 1].astype(np.float32)
        + 0.114 * rgb[..., 2].astype(np.float32)
    )
    local = cv2.GaussianBlur(lum, (0, 0), sigmaX=14, sigmaY=14)
    detail = np.abs(lum - local)

    max_c = np.max(rgb, axis=2).astype(float)
    min_c = np.min(rgb, axis=2).astype(float)
    sat = np.divide(max_c - min_c, max_c, out=np.zeros_like(max_c), where=max_c > 0)

    x1, y1, x2, y2 = artwork_bounds(lum)
    outer = flood_outer_black(lum)
    keep = build_foreground_mask(lum, detail, sat, outer)
    keep = largest_component(keep)
    keep = peel_halo(keep, lum, detail)

    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[keep, :3] = rgb[keep]
    rgba[keep, 3] = 255
    rgba = remove_flat_dark_matte(rgba, lum, detail)

    cut = Image.fromarray(rgba)
    bbox = cut.getbbox()
    if not bbox:
        raise RuntimeError("Logo foreground extraction failed")

    cropped = cut.crop(bbox)
    CUT.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(CUT)

    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    paste_x = x1 + max(0, ((x2 - x1) - cropped.width) // 2)
    paste_y = y1 + max(0, ((y2 - y1) - cropped.height) // 2)
    canvas.paste(cropped, (paste_x, paste_y), cropped)
    canvas.save(OUT)
    canvas.save(HEADER)

    opaque = int(np.array(canvas)[..., 3].astype(bool).sum())
    print(
        f"Saved cut {CUT} ({cropped.size[0]}x{cropped.size[1]})\n"
        f"Saved {OUT} and {HEADER.name} ({w}x{h}) at ({paste_x}, {paste_y}), opaque={opaque}"
    )


if __name__ == "__main__":
    main()
