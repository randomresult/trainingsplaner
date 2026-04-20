'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/trainings/:id/complete',
      handler: 'training.complete',
      config: {
        auth: {},
      },
    },
  ],
};
