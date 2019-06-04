import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import config from 'livarava-jobs-ember/config/environment';

export default Controller.extend({
  // Services
  session: service(),
  router: service(),

  // Variables
  rootURL: config.rootURL,
  email: null,
  password: null,
  error: null,

  // Flags
  isEmailError: true,
  isLoading: false,

  // Computed Variables
  emailClass: computed('error', function () {
    let error = this.get('error');
    return (error === null) ? `form-control` : `form-control is-invalid`;
  }),

  passwordClass: computed('error', function () {
    let error = this.get('error');
    return (error === null) ? `form-control` : `form-control is-invalid`;
  }),

  // Actions
  actions: {
    signin() {
      const session = this.get('session');
      const login = this.get('email');
      const password = this.get('password');

      this.set('error', null);
      this.set('isLoading', true);

      session
        .authenticate('authenticator:custom', login, password)
        .then(() => {
          this.set('isLoading', false);
          const next = this.get('model.next');

          if (window && next) {
            window.open(next, '_self');
          } else {
            this.transitionToRoute('index');
          }
        })
        .catch((response) => {
          let error = response.error || 'Unknown error. Please, report to admin@livarava.com';
          this.set('isLoading', false);
          this.set('error', error);
        });
    }
  },

});
