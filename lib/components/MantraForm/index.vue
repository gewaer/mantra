<script>
import MantraForm from "./../../core/components/MantraForm";
import { error } from "../../utils";
import { getPathFromObject, pushToRouteParams } from "./utils";

export default {
  functional: true,
  beforeRouteEnter(to, from, next) {
    try {
      const path = getPathFromObject(to.params);
      const config = MantraForm._getConfig({ path });
      pushToRouteParams(to, { config });
      next();
    } catch (err) {
      error(err.message);
      next("*");
    }
  },
  render(createElement, context) {
    const {
      props: { config },
      parent,
      children
    } = context;

    if (!config.component._isValidComponent(parent)) {
      return createElement("notFound", context.data, children);
    }

    return createElement(
      config.component.name,
      { ...context.data, props: { config } },
      children
    );
  }
};
</script>