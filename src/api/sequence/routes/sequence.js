'use strict';

/**
 * sequence router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::sequence.sequence');
