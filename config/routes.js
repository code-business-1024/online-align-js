export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'tool.online-align',
    icon: 'table',
    path: '/align',
    component: './OnlineAlign',
  },
  {
    path: '/',
    redirect: '/align',
  },
  {
    component: './404',
  },
];
