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

const pushToRouteParams = function (route, payload) {
    for (const [key, value] of Object.entries(payload)) {
        route.params[key] = value;
    }
};

export default {
    functional: true,
    beforeRouteEnter(to, from, next) {
        const path = convertRouteToPath(to);
        const config = MantraForm._getConfig({ path });
        const IS_PATH_EMPTY = (config._path === '');
        
        if (IS_PATH_EMPTY) {
            pushToRouteParams(to, { config });
            console.log("[beforeRouteEnter] ROUTE OBJECT", to);
            next();
        } else {
            next('*');
        }
    },
    render(createElement, context) {
        console.log("[render] CONTEXT", context);
        const { props: { config }, parent } = context;
        const IS_VALID_COMPONENT = config.component._isValidComponent(parent);
        console.log("IS VALID COMPONENT", IS_VALID_COMPONENT);
        // Component is render using CreateElement
        createElement('GeneralVehicle', context);
    }
};
</script>