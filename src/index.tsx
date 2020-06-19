import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { CIRCLE, RECTANGLE, LINE, TEXT } from './defaultShapes'

export interface Props {
  className?: string
  onReady?: (editor: FabricJSEditor) => void
}

export interface FabricJSEditor {
  canvas: fabric.Canvas
  addCircle: () => void
  addRectangle: () => void
  addLine: () => void
  addText: (text: string) => void
  deleteAll: () => void
  deleteSelected: () => void
}

const createEditor = (canvas: fabric.Canvas): FabricJSEditor => {
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
      return;
    }
  }
}

interface FabricJSEditorState {
  editor?: FabricJSEditor
}

interface FabricJSEditorHook extends FabricJSEditorState {
  onReady: (editor: FabricJSEditor) => void
}

export const useFabricJSCanvas = (): FabricJSEditorHook => {
  const [editorState, setEditorState] = useState<FabricJSEditorState>({})
  return {
    editor: editorState.editor,
    onReady: (editor: FabricJSEditor): void => {
      setEditorState({ editor })
    }
  }
}

export const FabricJSCanvas = ({ className, onReady }: Props) => {
  const canvasEl = useRef(null)
  const canvasElParent = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current)
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0)
      canvas.setWidth(canvasElParent.current?.clientWidth || 0)
      canvas.renderAll()
    }
    const resizeCanvas = () => {
      setCurrentDimensions()
    }
    setCurrentDimensions()

    window.addEventListener('resize', resizeCanvas, false)

    if (onReady) {
      onReady(createEditor(canvas))
    }

    return () => {
      canvas.dispose()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  return (
    <div ref={canvasElParent} className={className}>
      <canvas ref={canvasEl} />
    </div>
  )
}
