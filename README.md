# Veitch Karnaugh AI


This project have exponencial computational cost.

This is an boolean algebra based AI model, made using the Veitch Karnaugh map. It only works with zeros and ones

## Example

logic of this example:

The first two inputs are the outputs if the last input is 0 otherwise they are reversed.

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
// result
[ 0, 1 ]
[ 1, 0 ]
[ 1, 0 ]
[ 0, 1 ]

// boolean algebra model
[!input[1] && !input[2] || input[1] && input[2],!input[1] && input[2] || input[1] && !input[2]]
```

[source code](https://github.com/Thiago099/veitch-karnaugh-ai-example)
