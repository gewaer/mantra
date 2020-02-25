import MantraState from './MantraState';

/*
    MantraInfo class (Phase 1 - Installation)
    @extends MantraState

    Attributes

    - _Root: string = '' (Not yet supported)

    Operations (Not yet supported)
    
    - update(): Error
*/

export default class MantraInfo extends MantraState {
    constructor({ name, type, defaultValue }) {
        super({ name, type, defaultValue });
        this._root = 'info';
    }
}