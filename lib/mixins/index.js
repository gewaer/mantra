import { MantraPlugin } from '../MantraPlugin';

const mixin = {
    mounted() {
        this.setMantraDataTypes();
        console.log("MANTRA PLUGIN", MantraPlugin.getConfig());
    },
    methods: {
        setMantraDataTypes() {
            const schemas = MantraPlugin.getSchemasModule();
            const fields = schemas.vehicles.fields;
            
            for (const field in fields) {
                console.log(`FIELD: ${field}`, fields[field]);
                fields[field]._setDataType();
            }
        }
    }
};

export default mixin;