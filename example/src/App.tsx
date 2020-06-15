import React from 'react'

import { FabricJSCanvas, useFabricJSCanvas } from 'fabricjs-react'
import 'fabricjs-react/dist/index.css'

const App = () => {
  const { editor, onReady } = useFabricJSCanvas()
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }

  return (<div>
    <button onClick={onAddCircle}>Add circle</button>
    <button onClick={onAddRectangle}>Add Rectangle</button>
    <FabricJSCanvas className="sample-canvas" onReady={onReady} />
  </div>)
}

export default App
