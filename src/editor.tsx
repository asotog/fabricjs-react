import { fabric } from 'fabric'
import { CIRCLE, RECTANGLE, LINE, TEXT } from './defaultShapes'
import { useEffect, useState } from 'react'

export interface FabricJSEditor {
  addCircle: () => void
  addRectangle: () => void
  addLine: () => void
  addText: (text: string) => void
  updateText: (text: string) => void
  deleteAll: () => void
  deleteSelected: () => void
}

/**
 * Creates editor
 */
const buildEditor = (canvas: fabric.Canvas): FabricJSEditor => {
  return {
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
    updateText: (text: string) => {
      const objects: any[] = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject: fabric.Text = objects[0]
        textObject.set({ text })
        canvas.renderAll()
      }
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

interface FabricJSEditorState {
  editor?: FabricJSEditor
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[]
  onReady: (canvas: fabric.Canvas) => void
}

const useFabricJSEditor = (): FabricJSEditorHook => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])
  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvas.on('selection:created', (e: any) => {
        setSelectedObject(e.selected)
      })
      canvas.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected)
      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      setCanvas(canvasReady)
    },
    editor: canvas ? buildEditor(canvas) : undefined
  }
}

export { buildEditor, useFabricJSEditor, FabricJSEditorHook }
