import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import {get} from '@ember/object';
import {inject as service} from '@ember/service';
import {Promise} from 'rsvp';

export default Base.extend({
  // Services
  session: service(),
  cookies: service(),
  me: service(),

  restore(data) {
    const me = get(this, 'me');
    const dataToken = data.token || data.data.session;
    const sessionToken = get(this, 'session.token');
    const cookiesToken = get(this, 'cookies').read('token');
    const meToken = get(this, 'me.token');
    const token = dataToken || sessionToken || cookiesToken || meToken;

    console.log('Restoring session...');
    console.log(`Token: ${token}`);

    // noinspection UnnecessaryLocalVariableJS
    let promise = new Promise(function (resolve, reject) {

      me.load(token)
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });

    });

    return promise;
  },

  authenticate(login, password) {
    const me = this.get('me');

    // noinspection UnnecessaryLocalVariableJS
    let promise = new Promise(function (resolve, reject) {

      me.signIn(login, password)
        .then((response) => {

          if (response.error) {
            reject(response);
          } else {
            resolve(response);
          }

        })
        .catch((response) => {
          reject(response);
        });

    });

    return promise;
  },

  invalidate() {
    const me = this.get('me');

    // noinspection UnnecessaryLocalVariableJS
    let promise = new Promise(function (resolve) {

      me.signOut().then((data) => {
        resolve(data);
      });

    });

    return promise;
  }
});
