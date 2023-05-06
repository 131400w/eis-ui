export default {
    routes: [
      {
        method: 'GET',
        path: '/role/findPermission',
        handler: 'ym-role-permission.findPermission',
      },
      {
        method: 'GET',
        path: '/role/findPermissionAction',
        handler: 'ym-role-permission.findPermissionAction',
      },
    ],
  };