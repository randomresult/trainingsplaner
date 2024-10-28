'use strict';

/**
 * playerlog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::playerlog.playerlog');
