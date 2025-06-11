module.exports = {
  async register(ctx) {
    const { email, password, username, clubDocumentId, firstName, lastName } = ctx.request.body;

    try {
      // Step 1: Create user with standard registration
      const user = await strapi.plugins['users-permissions'].services.user.add({
        username,
        email,
        password,
        confirmed: false, // Set to false initially
        firstName,
        lastName,
        requestedClub: clubDocumentId,
        provider: 'local',
      });

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
      strapi.log.error('Custom registration error:', error);
      ctx.badRequest('Registration failed', { error: error.message });
    }
  },
};