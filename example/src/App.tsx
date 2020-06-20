import React, { useState } from 'react'

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

const App = () => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor()
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
    if (selectedObjects?.length) {
      return editor?.updateText(text)
    }
    editor?.addText(text);
  }
  const onDeleteAll = () => {
    editor?.deleteAll();
  }
  const onDeleteSelected = () => {
    editor?.deleteSelected();
  }

  return (<div>
    <button onClick={onAddCircle}>Add circle</button>
    <button onClick={onAddRectangle}>Add Rectangle</button>
    <button onClick={onAddLine}>Add Line</button>
    <button onClick={onDeleteAll}>Delete All</button>
    <button onClick={onDeleteSelected}>Delete Selected</button>
    <input
      type="text"
      value={text}
      onChange={e => setText(e.target.value)}
    />
    <button onClick={onAddText}>Add Text</button>
    <pre>{JSON.stringify(selectedObjects)}</pre>
    <FabricJSCanvas className="sample-canvas" onReady={onReady} />
  </div>)
}

export default App
