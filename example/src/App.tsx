import React, { useState } from 'react'

import { FabricJSCanvas, useFabricJSCanvas } from 'fabricjs-react'

const App = () => {
  const { editor, onReady } = useFabricJSCanvas()
  const [text, setText] = useState("");

  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }
  const onAddLine = () => {
    editor?.addLine()
  }
  const onAddText = () => {
    editor?.addText(text);
  }
  const onClean = () => {
    editor?.deleteAll();
  }

  return (<div>
    <button onClick={onAddCircle}>Add circle</button>
    <button onClick={onAddRectangle}>Add Rectangle</button>
    <button onClick={onAddLine}>Add Line</button>
    <button onClick={onClean}>Clean</button>
    <input
      type="text"
      value={text}
      onChange={e => setText(e.target.value)}
    />
    <button onClick={onAddText}>Add Text</button>
    <FabricJSCanvas className="sample-canvas" onReady={onReady} />
  </div>)
}

export default App
