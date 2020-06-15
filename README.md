# fabricjs-react

> support fabricjs from react

[![NPM](https://img.shields.io/npm/v/fabricjs-react.svg)](https://www.npmjs.com/package/fabricjs-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fabricjs-react
```

## Usage

```tsx
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
```

## License

MIT © [Alejandro Soto](https://github.com/Alejandro Soto)
