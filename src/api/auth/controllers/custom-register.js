module.exports = {
  async register(ctx) {
    const { email, password, username, clubDocumentId, firstName, lastName } = ctx.request.body;

    try {
      console.log('Custom registration attempt:', { email, username, firstName, lastName, clubDocumentId });

      // Step 1: Create user with standard registration using Document Service
      // Get the Authenticated role (default role for registered users)
      const authenticatedRole = await strapi.documents('plugin::users-permissions.role').findMany({
        filters: { name: 'Authenticated' },
        limit: 1
      });
      
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
          role: authenticatedRole[0]?.documentId, // Assign Authenticated role by default
        }
      });

      console.log('User created:', user);
      
      // One-time fix for existing users without roles
      if (authenticatedRole[0]?.documentId) {
        try {
          const usersWithoutRoles = await strapi.documents('plugin::users-permissions.user').findMany({
            filters: { role: { $null: true } },
            limit: 100
          });
          
          console.log(`Found ${usersWithoutRoles.length} users without roles`);
          
          for (const userWithoutRole of usersWithoutRoles) {
            await strapi.documents('plugin::users-permissions.user').update({
              documentId: userWithoutRole.documentId,
              data: { role: authenticatedRole[0].documentId }
            });
            console.log(`Updated role for user: ${userWithoutRole.email}`);
          }
        } catch (roleUpdateError) {
          console.error('Error updating roles for existing users:', roleUpdateError);
        }
      }

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

  async approveUser(ctx) {
    const { documentId } = ctx.params;
    const { confirmed, role, createPlayer, playerData } = ctx.request.body;

    try {
      console.log('Approving user:', { documentId, confirmed, role, createPlayer });

      // Update user confirmation and role
      const updatedUser = await strapi.documents('plugin::users-permissions.user').update({
        documentId: documentId,
        data: {
          confirmed: confirmed,
          role: role
        }
      });

      console.log('User updated successfully:', updatedUser);

      // Create player profile if requested
      if (createPlayer && playerData) {
        console.log('Creating player profile:', playerData);
        
        const playerResponse = await strapi.documents('api::player.player').create({
          data: {
            Name: playerData.Name || 'Unbekannt',
            firstname: playerData.firstname || 'Unbekannt',
            user: documentId,
            Club: playerData.Club,
            publishedAt: new Date().toISOString()
          }
        });

        console.log('Player created successfully:', playerResponse);
      }

      ctx.send({
        success: true,
        user: updatedUser,
        message: 'User approved successfully'
      });

    } catch (error) {
      console.error('User approval error:', error);
      ctx.badRequest('User approval failed', { error: error.message });
    }
  },
};