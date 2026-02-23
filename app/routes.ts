import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/public.tsx", [
    index("routes/home.tsx"),
    route("all-components", "routes/all-components.tsx"),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),

  route("api/auth/*", "routes/api.auth.$.ts"),

  route("app", "layouts/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
    route("inventory", "routes/dashboard/inventory.tsx"),
    route("orders", "routes/dashboard/orders.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
  ]),
] satisfies RouteConfig;
