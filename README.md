# Smoke Effect
Realistic smoke effect using html canvas.

## Example
![https://github.com/elisiondesign/smoke-effect/raw/master/example/Feb-26-2019%2009-52-17.gif](https://github.com/elisiondesign/smoke-effect/raw/master/example/Feb-26-2019%2009-52-17.gif)

## Usage
```html
<canvas id="canvase"></canvas>
```

```js
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 1000;
    var smoke = new Smoke(context, [80, 80, 80]); // context canvas, smoke color
    smoke.start();
    smoke.step(500);
    addSmoke(smoke);
  
  // Make run smoke run indefinitely
    function addSmoke() {
      smoke.addSmoke(400, 500, 2);
      smoke.addSmoke(600, 500, 3);
      setTimeout(() => {
        addSmoke();
      }, 1000);
    }
```

