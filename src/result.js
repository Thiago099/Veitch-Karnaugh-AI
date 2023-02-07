import { array1d, tile } from './utils.js'
export function result(x1, y1, x2, y2,x_dimension,y_dimension,x_dimension_length,y_dimension_length,xv,yv) {
    let result = [];
    let curs = [];
    let negatedx = array1d(xv.length,false);
    let cx = array1d(xv.length,true);
    let negatedy = array1d(yv.length, false);
    let cy = array1d(yv.length,true);

    for (let i = x1; ; i = tile(i + 1, x_dimension_length)) {
        curs.push(x_dimension[i]);
        if (i === x2) break;
    }
    for (let i = 0; i < curs.length; i++) {
        for (let j = i; j < curs.length; j++) {
            for (let k = 0; k < curs[j].length; k++) {
                if (curs[i][k] !== curs[j][k]) cx[k] = false;
                else if (curs[i][k] === 0) negatedx[k] = true;
            }
        }
    }
    for (let i = 0; i < cx.length; i++) {
        if (cx[i]) {
            result.push(`${negatedx[i]?"!":""}input[${xv[i]}]`);
        }
    }

    curs = [];
    for (let i = y1; ; i = tile(i + 1, y_dimension_length)) {
        curs.push(y_dimension[i]);
        if (i === y2) break;
    }

    for (let i = 0; i < curs.length; i++) {
        for (let j = i; j < curs.length; j++) {
            for (let k = 0; k < curs[j].length; k++) {
                if (curs[i][k] !== curs[j][k]) cy[k] = false;
                else if (curs[i][k] === 0) negatedy[k] = true;
            }
        }
    }

    for (let i = 0; i < cy.length; i++) {
        if (cy[i]) {
            result.push(`${negatedy[i]?"!":""}input[${yv[i]}]`);
        }
    }

    return result.join(" && ");
}