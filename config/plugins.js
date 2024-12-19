module.exports = {
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 200,
      apolloServer: {
        tracing: false,
        introspection: true,
        playground: true
      },
    },
  },
};
