export default function Calcgeneration(number){

    return converttofloat((number * 0.92).toFixed(2));
}


function converttofloat(val){
    return parseFloat(val)
}