const stroke = '#000000'
const fill = 'rgba(255, 255, 255, 0.0)'

export const CIRCLE = {
  radius: 20,
  left: 100,
  top: 100,
  fill,
  stroke
}

export const RECTANGLE = {
  left: 100,
  top: 100,
  fill,
  stroke,
  width: 40,
  height: 40,
  angle: 0
}

export const LINE = {
  points: [50, 100, 200, 200],
  options: {
    left: 170,
    top: 150,
    stroke
  }
}

export const TEXT = {
  type: 'text',
  left: 100,
  top: 100,
  fontSize: 16,
  fill: stroke
}
