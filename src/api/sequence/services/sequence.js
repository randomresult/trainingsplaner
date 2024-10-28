'use strict';

/**
 * sequence service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sequence.sequence');
