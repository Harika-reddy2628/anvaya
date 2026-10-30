let measure: CanvasRenderingContext2D | null | undefined;

/** The screen y of the top of a letter's ink (its cap or ascender), not the top of its line box, which sits higher by
    the font's spare ascent. This is what a butterfly resting on the letter must touch. */
export function letterInkTop(range: Range, character: string, host: Element) {
  const box = range.getBoundingClientRect();
  measure ??= document.createElement("canvas").getContext("2d");
  if (!measure) return box.top + box.height * .2;
  const style = getComputedStyle(host);
  measure.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const metrics = measure.measureText(character);
  const spare = metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent;
  return box.top + (Number.isFinite(spare) ? Math.max(0, spare) : box.height * .2);
}
