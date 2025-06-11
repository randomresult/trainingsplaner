module.exports = {
  async register(ctx) {
    const { email, password, username, clubDocumentId, firstName, lastName } = ctx.request.body;

    try {
      console.log('Custom registration attempt:', { email, username, firstName, lastName, clubDocumentId });

      // Step 1: Create user with standard registration using Document Service
      const user = await strapi.documents('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          password,
          confirmed: false, // Set to false initially
          firstName,
          lastName,
          requestedClub: clubDocumentId,
          provider: 'local',
        }
      });

      console.log('User created:', user);

      // Step 2: Generate JWT token
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      ctx.send({
        jwt,
        user: {
          id: user.id,
          documentId: user.documentId,
          username: user.username,
          email: user.email,
          confirmed: user.confirmed,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.error('Custom registration error:', error);
      ctx.badRequest('Registration failed', { error: error.message });
    }
  },
};