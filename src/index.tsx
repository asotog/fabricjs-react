import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { buildEditor, FabricJSEditor } from './editor'

export interface Props {
  className?: string
  onReady?: (editor: FabricJSEditor) => void
}

interface FabricJSEditorState {
  editor?: FabricJSEditor
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[]
  onReady: (editor: FabricJSEditor) => void
}

const useFabricJSEditor = (): FabricJSEditorHook => {
  const [editorState, setEditorState] = useState<FabricJSEditorState>({})
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])
  const { editor } = editorState
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
    if (editor) {
      bindEvents(editor.canvas)
    }
  }, [editor])

  return {
    editor,
    selectedObjects,
    onReady: (editor: FabricJSEditor): void => {
      console.log('editor ready')
      setEditorState({ editor })
    }
  }
}

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady }: Props) => {
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
      onReady(buildEditor(canvas))
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

export { FabricJSEditor, FabricJSCanvas, FabricJSEditorHook, useFabricJSEditor }
