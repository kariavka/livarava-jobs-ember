'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'livarava-jobs-ember',
    environment,
    rootURL: '/admin/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    api: {
      host: 'https://www.livarava.com',
      path: '/api/v2',
      token: null,
    },
  };

  if (environment === 'development') {
    ENV['api'] = {
      host: 'https://dev.livarava.com',
      path: '/api/v2',
      token: null,
    };
  }

  if (environment === 'local') {
    ENV['api'] = {
      host: '//local.livarava.com',
      path: '/api/v2',
      token: null,
    };

    ENV['metricsAdapters'] = [];
  }

  if (environment === 'master') {
    ENV['api'] = {
      host: 'https://www.livarava.com',
      path: '/api/v2',
      token: null,
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
