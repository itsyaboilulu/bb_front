import { combineReducers } from "redux";

import DialogReducer from './Dialog/DialogReducer';
import UserReducer from './User/UserReducer';
import ListsReducer from './Lists/ListsReducer';

export default combineReducers({
    dialog: DialogReducer,
    user: UserReducer,
    lists: ListsReducer,
})