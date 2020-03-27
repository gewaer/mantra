import MantraData from './../core/MantraData';

const MIXIN = {
    props: {
        config: {
            type: [ MantraData ],
            required: true,
        }
    }
};

export default MIXIN;