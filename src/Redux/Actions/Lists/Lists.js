import { LISTS_SET } from 'Redux/Types/Lists/ListsTypes';
export  function setLists(key, value) {
    return {
        type: LISTS_SET,
        action: {
            [key]: value
        }
    }
}
