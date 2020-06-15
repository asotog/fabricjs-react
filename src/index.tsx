import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { CIRCLE, RECTANGLE } from './defaultShapes'

export interface Props {
  className?: string
  onReady?: (editor: FabricJSEditor) => void
}

export interface FabricJSEditor {
  canvas: fabric.Canvas
  addCircle: () => void
  addRectangle: () => void
}

const createEditor = (canvas: fabric.Canvas): FabricJSEditor => {
  return {
    canvas,
    addCircle: () => {
      const shape = new fabric.Circle(CIRCLE)
      canvas.add(shape)
      console.log('adding circle')
    },
    addRectangle: () => {
      const shape = new fabric.Rect(RECTANGLE)
      canvas.add(shape)
    }
  }
}

export const FabricJSCanvas = ({ className, onReady }: Props) => {
  const canvasEl = useRef(null)
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current)
    if (onReady) {
      onReady(createEditor(canvas))
    }
    return () => {
      canvas.dispose()
    }
  }, [])
  return <canvas ref={canvasEl} className={className} />
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
