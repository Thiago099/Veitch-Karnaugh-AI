import { generate_binary_combinations } from './src/binary-combinations.js'
import { find_next_section } from './src/find-next-section.js'
import { array2d, tile } from './src/utils.js'
import { result } from './src/result.js'
class Model{
    constructor(logic){
        this.logic = logic
    }
    predict(input){
        return this.logic.map(x=>Number(eval(x)))
    }
    toString(){
        return `[${this.logic}]`
    }

}

export function train(input, output)
{

    validate_shape(input);
    validate_shape(output);

    var input_length = input[0].length;
        
    var table = generate_binary_combinations(input_length)

    
    var table_length = table[0].length;
    var length_x = Math.floor(table_length / 2);
    var length_y = table_length - length_x;
    
    var x_dimension = generate_binary_combinations(length_x);
    var y_dimension = generate_binary_combinations(length_y);

    var x_dimension_length = x_dimension.length;
    var y_dimension_length = y_dimension.length;


    // calculate recver index

    var n = 0;
    var xv = []

    for (var i = 0; i < length_x; i++)
    {
        xv.push(n);
        n++;
    }
    
    var yv = []
    for (var i = 0; i < length_y; i++)
    {
        yv.push(n);
        n++;
    }

    var map = array2d(x_dimension_length, y_dimension_length, 2);
    

    var out = []

    for(var output_index = 0; output_index < output[0].length; output_index++) 
    {
        // filling map
        
        for(var i = 0; i < x_dimension_length; i++) {
            for(var j = 0; j < y_dimension_length; j++) {
                var data = [x_dimension[i], y_dimension[j]].toString();
                for(const index in input) {
                    if(data == input[index].toString()) {
                        map[i][j] = output[index][output_index];
                        break
                    }
                }
            }
        }

        var needed = array2d(x_dimension_length, y_dimension_length, false);

        for(var i = 0; i < x_dimension_length; i++) {
            for(var j = 0; j < y_dimension_length; j++) {
                if(map[i][j] == 1)
                {
                    needed[i][j] = true;
                }
            }
        }

        var sb = "";
        while (true)
        {

            var [[x1,y1],[x2,y2],maxSize] = find_next_section(map,needed)

            if(maxSize == 0) break;

            var res = result(x1, y1, x2, y2,x_dimension,y_dimension,x_dimension_length,y_dimension_length,xv,yv)
            
            
            if (res != "")
                sb += res + " || ";

            set_used(x1, y1, x2, y2, x_dimension_length, y_dimension_length, needed)

        }
        out.push(sb.substring(0, sb.length - 4));
    }
    return new Model(out);
}

function validate_shape(input)
{
    var shape = input[0].length;
    for (var i = 1; i < input.length; i++)
    {
        if (input[i].length != shape)
        {
            throw new Error("shape is not consistent");
        }
    }
}

function set_used(x1, y1, x2, y2, max_x, max_y, needed)
{
    for (var i = x1; ; i = tile(i + 1, max_x))
    {
        for (var j = y1; ; j = tile(j + 1, max_y))
        {
            needed[i][j] = false;
            if (j == y2) break;
        }
        if (i == x2) break;
    }
}









