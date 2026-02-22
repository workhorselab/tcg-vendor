import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("all-components", "routes/all-components.tsx"),
] satisfies RouteConfig;
