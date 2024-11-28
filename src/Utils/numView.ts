import { toFixed } from "./NumString";
import { divide } from "./NumString/stringArithmatics";

export const numView = (data:number|string|null|undefined|bigint, decimal=6,precision=2)=>{
    if(typeof data == 'undefined' || data == null){
        return '0';
    }
    if(typeof data == 'number' || typeof data == 'bigint'){
        data = data.toString();
    }
    data
    return toFixed(divide(data,decimal) || "0",precision);
}