import MantraData from './../core/MantraData';

const MIXIN = {
    props: {
        config: {
            type: [ MantraData ],
            required: true,
        },
        role: {
            type: String,
            required: true,
            validator(value) {
                return ['ROOT', 'CHILD'].includes(value);
            }
        }
    },
    data() {
        return {
            mantra: {},
        };
    },
    computed: {
        isRoot() {
            return (this.role === 'ROOT');
        },
    },
};

export default MIXIN;