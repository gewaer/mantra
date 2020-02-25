/*
    MantraSchema class (Phase 1 - Installation)

    Attributes

    - name: string
    - fields: MantraState
    - actions: object

    Operations (Not yet supported)

    - N/A
*/

export default class MantraSchema {
    constructor({ name, fields, actions }) {
        this.name = name;
        this.fields = fields;
        this.actions = actions;
    }
};

/*
    Actions object (Phase 1 - Installation)

    Properties

    - fields: object
    - component: MantraForm

    Methods (Not yet supported)

    - N/A
*/