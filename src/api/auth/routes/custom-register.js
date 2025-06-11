module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/custom-register',
      handler: 'custom-register.register',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/approve-user/:documentId',
      handler: 'custom-register.approveUser',
      config: {
        auth: true,
        policies: [],
        middlewares: [],
      },
    },
  ],
};