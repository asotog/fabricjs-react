import { DefaultLine } from './types'

export const STROKE = '#000000'
export const FILL = 'rgba(255, 255, 255, 0.0)'

export const CIRCLE = {
  radius: 20,
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE,
  originX: 'left' as const,
  originY: 'top' as const
}

export const RECTANGLE = {
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE,
  width: 40,
  height: 40,
  angle: 0,
  originX: 'left' as const,
  originY: 'top' as const
}

export const LINE: DefaultLine = {
  points: [50, 100, 200, 200],
  options: {
    left: 170,
    top: 150,
    stroke: STROKE,
    originX: 'left' as const,
    originY: 'top' as const
  }
}

export const TEXT = {
  type: 'text',
  left: 100,
  top: 100,
  fontSize: 16,
  fontFamily: 'Arial',
  fill: STROKE,
  originX: 'left' as const,
  originY: 'top' as const
}
