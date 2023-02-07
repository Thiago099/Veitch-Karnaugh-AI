import { tile } from './utils.js'
export function find_next_section(matrix, needed) {


    var full_width = matrix[0].length;
    var full_height = matrix.length;

    var new_matrix = tile_matrix(matrix);


    let maxArea = 0;
    let rows = new_matrix.length;
    let cols = new_matrix[0].length;
    let left = new Array(cols).fill(0);
    let right = new Array(cols).fill(cols);
    let height = new Array(cols).fill(0);
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    
    for (let i = 0; i < rows; i++) {
      let curLeft = 0, curRight = cols;
      for (let j = 0; j < cols; j++) {
        if (new_matrix[i][j] !== 0) {
          height[j]++;
          left[j] = Math.max(left[j], curLeft);
        } else {
          height[j] = 0;
          left[j] = 0;
          curLeft = j + 1;
        }
      }
      for (let j = cols - 1; j >= 0; j--) {
        if (new_matrix[i][j] !== 0) {
          right[j] = Math.min(right[j], curRight);
        } else {
          right[j] = cols;
          curRight = j;
        }
      }
      for (let j = 0; j < cols; j++) {


        let area = Math.min((right[j] - left[j]),full_width) * Math.min(height[j],full_height);
        if (area > maxArea &&  is_power_of_two(area)) {
            const _x1 = (i - height[j] + 1)  % full_height;
            const _y1 = left[j] % full_width;
            const _x2 = i % full_height;
            const _y2 = (right[j] - 1)  % full_width;

            if(is_needed(_x1,_y1,_x2,_y2, needed))
            {
                x1 = _x1;
                y1 = _y1;
                x2 = _x2;
                y2 = _y2;
                maxArea = area;
            }
        }
      }
    }
    return [[x1, y1],[x2, y2], maxArea];
}


function is_power_of_two(x)
{
    return (x != 0) && ((x & (x - 1)) == 0);
}

function tile_matrix(matrix)
{
    var new_matrix = [];

    for(const item of matrix){
        new_matrix.push([...item, ...item]);
    }
    for(const item of matrix){
        new_matrix.push([...item, ...item]);
    }
    return new_matrix;
}

function is_needed(x1,y1,x2,y2, needed)
{
    for (var i = x1; ; i = tile(i + 1, needed.length))
    {
        for (var j = y1; ; j = tile(j + 1, needed[0].length))
        {
            if (needed[i][j]) return true;
            if (j == y2) break;
        }
        if (i == x2) break;
    }
    return false;
}