<script>
import MantraForm from './../core/components/MantraForm';

const getPathFromObject = function (route) {
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
            next();
        } else {
            next('*');
        }
    },
    render(createElement, context) {
        const { props: { config }, parent, children, data } = context;

        if (!config.component._isValidComponent(parent)) 
            return createElement('404', context.data, children);
        else
            return createElement(config.component.name, { ...context.data, props: { config } }, children);
    }
};
</script>