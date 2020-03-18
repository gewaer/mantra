<script>
import MantraForm from './../core/components/MantraForm';
import { error } from '../utils';

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
        const path = getPathFromObject(to);

        try {
            const config = MantraForm._getConfig({ path });
            pushToRouteParams(to, { config });
            next();
        } catch(err) {
            error(err.message);
            next('*');
        }
    },
    render(createElement, context) {
        const { props: { config }, parent, children, data } = context;

        if (!config.component._isValidComponent(parent)) {
            return createElement('404', context.data, children);
        }
        
        return createElement(config.component.name, { ...context.data, props: { config } }, children);
    }
};
</script>