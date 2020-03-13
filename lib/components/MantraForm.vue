<script>
/*
    MISSING IMPLEMENTATIONS:
    1. Route utility
    2. MantraForm class (static method "getConfig" usage)
    3. Render a component using MantraForm configuration
*/
import MantraForm from './../core/components/MantraForm';
const convertRouteToPath = function (route) {
    const { params } = route;
    const path = Object.values(params).join('.');
    return path;
};

export default {
    functional: true,
    beforeRouteEnter(to, from, next) {
        const path = convertRouteToPath(to);
        const config = MantraForm._getConfig({ path });
        
        const IS_VALID_COMPONENT = config.component._isValidComponent(this);
        const IS_PATH_EMPTY = (config.path === '');
        
        if (IS_VALID_COMPONENT && IS_PATH_EMPTY) {
            next();
        } else {
            next('*');
        }
    },
    render(createElement, context) {
        // Component is render using CreateElement
        createElement('GeneralVehicle', context);
    }
};
</script>