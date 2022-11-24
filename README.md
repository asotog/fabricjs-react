# fabricjs-react

> support fabricjs from react

[![NPM](https://img.shields.io/npm/v/fabricjs-react.svg)](https://www.npmjs.com/package/fabricjs-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

We'll need to install `fabric`, `react` and `react-dom` because are peer dependencies of this library if you haven't yet otherwise install only what you don't have:
```bash
npm install --save fabricjs-react fabric react react-dom
```

## Usage

Take a look at sandbox: https://codesandbox.io/s/flamboyant-wind-ff3x8

```tsx
import React from 'react'

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

const App = () => {
  const { editor, onReady } = useFabricJSEditor()
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }

  return (
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  )
}

export default App
```

## Alternative use cases

### Add image ([#3](https://github.com/asotog/fabricjs-react/issues/3))
For this case, you have to reference the FabricJS dependency to first load the image:

```tsx
import { fabric } from 'fabric'; // this also installed on your project
import { useFabricJSEditor } from 'fabricjs-react';

const { selectedObjects, editor, onReady } = useFabricJSEditor();
useEffect(() => {
  fabric.Image.fromURL('my_image.png', function (oImg) {
    editor?.canvas.add(oImg);
  });
}, [fabric, editor])
...
```
## License

MIT © [Alejandro Soto](https://github.com/Alejandro Soto)

Feel free to collaborate.

## Some Support

https://www.buymeacoffee.com/alecode
