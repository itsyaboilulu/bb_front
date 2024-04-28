import _ from 'lodash';
export async function setObjectWithNestedKey(obj, key, value) {
    if (key.includes('.')){
        let keys = key.split('.');
        if (!obj[keys[0]]){
            obj[keys[0]] = _.isInteger(parseInt(keys[0])) ? [] : {};
        } 
        if ( obj[keys[0]] instanceof Array ){
            obj[key[0]].push(
                await setObjectWithNestedKey( obj[keys[0]], key.replace(`${keys[0]}.`, ''), value )
            )
        } else {
            obj[key[0]] = await setObjectWithNestedKey( obj[keys[0]], key.replace(`${keys[0]}.`, ''), value )
        }
    } else {
        if ( obj[key] instanceof Array ){
            obj[key].push(value)
        } else {
            obj[key] = value
        }
    }
    return obj;
}