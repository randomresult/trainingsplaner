// config/server.js
module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 1337),
  url: env('NODE_ENV') === 'production'
      ? env('PUBLIC_URL')
      : undefined,  // Im Entwicklungsmodus standard URL verwenden
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: true,
});