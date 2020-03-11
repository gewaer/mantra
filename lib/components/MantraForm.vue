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
        next();
    },
    render(createElement, context) {
        // Component is render using CreateElement
    }
};
</script>