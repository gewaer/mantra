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
            validator: function(value) {
                return ['ROOT', 'CHILD'].some(option => option === value);
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