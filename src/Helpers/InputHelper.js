import _ from 'lodash'

class InputHelper {
    constructor(state, setState, formData = null, onStateChange){
        this.formData = formData;
        this.onStateChange = onStateChange ? onStateChange : () => {};
        this._setState = setState;
        this._state = (formData) ? state[formData] : state;
    }

    validateInputValue(e) {
        return e.target.value;
    }

    updateState = (state) => {
        this._state = (this.formData) ? state[this.formData] : state;;
    }

    setObjectWithNestedKey = async (obj, key, value) => {
        if (key.includes('.')){
            let keys = key.split('.');
            if (!obj[keys[0]]){
                obj[keys[0]] = {};
            } 
            obj[key[0]] = await this.setObjectWithNestedKey( obj[keys[0]], key.replace(`${keys[0]}.`, ''), value )
        } else {
            obj[key] = value
        }
        return obj;
    }

    handleTextInputChange = async (e) => {
        let {name, value, type} = e.target
        if (type === 'number'){
            value = parseFloat(value)
        }
        this.#updateState(await this.setObjectWithNestedKey(this._state, name, value));
    }

    handleCheckBoxChange = async (e) => {
        let {name, value} = e.target;
        this.#updateState( await this.setObjectWithNestedKey(this._state, name, !(value===true || value === 'true' || value === 1)));
    }

    #updateState = (state) => {
        this._state = state;
        if (this.formData ) {
            this._setState({
                [this.formData]: state
            },this.onStateChange)
        } else {
            this._setState(state, this.onStateChange)
        }
    }
}   

export default InputHelper;