import { useEffect, useRef } from 'react'
import * as fabric from 'fabric'
import { useFabricJSEditor, FabricJSEditor, FabricJSEditorHook } from './editor'

export interface Props {
  className?: string
  onReady?: (canvas: fabric.Canvas) => void
}

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady }: Props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const canvasElParent = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current ?? undefined)
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
      onReady(canvas)
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

export { FabricJSCanvas, useFabricJSEditor }
export type { FabricJSEditor, FabricJSEditorHook }
