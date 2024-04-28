
let _capatalize = (str) => {
   return str.split(' ').map(i => i[0].toUpperCase() + i.slice(1).toLowerCase()).join(' ').trim();
}

export const Capatalize = _capatalize;

export function CamelCase(str, upper1=false) {
    let _str = _capatalize(str).split('').join(' ').trim();
    if (!upper1){
        return _str[0].toLowerCase() + _str.slice(1);
    }
    return _str;
}