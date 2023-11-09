export const colorMix = (
  hexcolor1: string,
  hexcolor2: string,
  weight: number,
): string => {
  const d2h = (d: number): string => d.toString(16)
  const h2d = (h: string): number => parseInt(h, 16)

  let color = '#'

  for (let i = 1; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    const v1 = h2d(hexcolor1.slice(i, i + 2)) // extract the current pairs
    const v2 = h2d(hexcolor2.slice(i, i + 2))

    // combine the current pairs from each source color, according to the specified weight
    const val = d2h(
      Math.floor(v2 + (v1 - v2) * (Math.min(Math.max(weight, 0), 1))),
    )
    color += val.padStart(2, '0').slice(-2) // concatenate val to our new color string
  }

  return color // PROFIT!
}

export const getContrastYIQ = (hexcolor: string) => {
  const h = hexcolor.replace('#', '')

  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 180
}

export const addAlpha = (color: string, opacity: number) => {
  const _opacity = Math.ceil(Math.min(Math.max(opacity, 0), 1) * 255)
  return color + _opacity.toString(16).toUpperCase().padStart(2, '0').slice(-2)
}
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '0 0 0'
}
