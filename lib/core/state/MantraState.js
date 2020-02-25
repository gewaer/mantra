/*
    MantraState class (Phase 1 - Installation)

    Attributes

    - Name?: string = '' (Generated internally)
    - Type: string = 'String'; Supported types: (String, Number, Record, Collection, ...) [Yet to define]
    - Default?: any = ''
*/

export default class MantraState {
    constructor({ name = '', type,  defaultValue = '' }) {
        this.name = name;
        this.type = type;
        this.default = defaultValue;
    }
};