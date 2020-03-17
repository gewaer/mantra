import { MantraPlugin } from '../MantraPlugin';

const mixin = {
    $m_mixin: 'MantraForm',
    mounted() {
        this.setMantraDataTypes();
    },
    methods: {
        setMantraDataTypes() {
            const schemas = MantraPlugin.getSchemasModule();
            const fields = schemas.vehicles.fields;
            
            for (const field in fields) {
                fields[field]._setDataType();
            }
        }
    }
};

export default mixin;