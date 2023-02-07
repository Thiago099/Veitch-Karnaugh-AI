export function tile(x, max){
    if (x >= max) x = x % max;
    while (x < 0) x += max;
    return x;
}

export function array2d(rows, cols, defaultValue) {
    return Array(rows).fill().map(() => Array(cols).fill(defaultValue));
}

export function array1d(rows, defaultValue) {
    return Array(rows).fill(defaultValue);
}