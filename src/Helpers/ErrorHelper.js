export default class ErrorHelper {
    constructor(errors=null){
        if (errors){
            this.errors = this.#formatErrors(errors);
        }
    }

    #formatErrors = (errors) => {
        let ret = {};
        
        errors.forEach(element => {
            ret[element.element] = element
        });

        return ret;
    }

    get = (name) => {
        return (this.errors && this.errors[name]) || null;
    }
    
    getError = (name) => {
        return (this.errors && this.errors[name]?.message) || null;
    }

    set = (errors) => {
        this.errors = this.#formatErrors(errors);
        return this;
    }
    
    has = (name) => {
        return !!(this.errors && this.errors[name]);
    }

    hasErrors = () => {
        return !!this.errors
    }

}