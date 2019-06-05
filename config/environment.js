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
      neuronet: {
        uid: 'f12878c8-7cd8-11e4-9f30-040105750d01',
        site: 4964,
        blog: '0,4964,97646',
        careers: '0,4964,133211',
      },

      displayOptions: [{
        value: 'public',
        label: 'Public',
        icon: 'fa fa-globe',
        description: 'Anyone on or off LivaRava',
      }, {
        value: 'unlisted',
        label: 'Unlisted',
        icon: 'fa fa-chain',
        description: 'Only by the link',
      }, {
        value: 'private',
        label: 'Private',
        icon: 'fa fa-lock',
        description: 'Only me',
      },],
    },

    api: {
      host: 'https://www.livarava.com',
      path: '/api/v2',
      token: null,
    },

    moment: {
      includeLocales: true,
      includeTimezone: 'all',
      defaultTimezone: 'UTC',
    },

    showdown: {
      simplifiedAutoLink: true
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
