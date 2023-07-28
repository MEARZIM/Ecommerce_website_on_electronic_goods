'use strict';

/**
 * return service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::return.return');
