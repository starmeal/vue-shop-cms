const routeFile = require.context('@/views/', true, /router.js/);
export const asyncRoutes = [];
routeFile.keys().forEach((key) => {
  asyncRoutes.push(...routeFile(key).default);
});
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  if (roles[0] === '*') {
    return routes
  }
  const result = []
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        let result = filterAsyncRoutes(tmp.children, roles);
        result[0].path = '';
        tmp.children = result
      }
      result.push(tmp);
    }
  });
  return result;
}