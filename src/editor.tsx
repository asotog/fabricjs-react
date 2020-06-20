import { fabric } from 'fabric'
import { CIRCLE, RECTANGLE, LINE, TEXT } from './defaultShapes'

export interface FabricJSEditor {
  canvas: fabric.Canvas
  selectedObject?: fabric.Object
  addCircle: () => void
  addRectangle: () => void
  addLine: () => void
  addText: (text: string) => void
  deleteAll: () => void
  deleteSelected: () => void
}

/**
 * Creates editor
 */
const buildEditor = (canvas: fabric.Canvas): FabricJSEditor => {
  return {
    canvas,
    addCircle: () => {
      const object = new fabric.Circle(CIRCLE)
      canvas.add(object)
    },
    addRectangle: () => {
      const object = new fabric.Rect(RECTANGLE)
      canvas.add(object)
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, LINE.options)
      canvas.add(object)
    },
    addText: (text: string) => {
      const object = new fabric.Text(text, TEXT)
      object.set({ text: text })
      canvas.add(object)
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }
}

export { buildEditor }
