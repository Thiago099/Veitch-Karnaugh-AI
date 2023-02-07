# veitch-karnaugh-ai

## Example

```js
import { train } from 'veitch-karnaugh-ai';

var x = [
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 1],
    [1, 0, 1]
]

var y = [
    [0, 1],
    [1, 0],
    [1, 0],
    [0, 1]
]

var model = train(x, y);


for(const item of x) {
    console.log(model.predict(item));
}
```
output
```js
[ 0, 1 ]
[ 1, 0 ]
[ 1, 0 ]
[ 0, 1 ]
```

[source code](https://github.com/Thiago099/veitch-karnaugh-ai-example)
