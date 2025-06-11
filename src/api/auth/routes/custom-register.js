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
  ],
};