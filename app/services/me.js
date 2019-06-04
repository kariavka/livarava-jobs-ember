import Service, {inject as service} from '@ember/service';
import {get, set, computed} from '@ember/object';
import {reads} from '@ember/object/computed';
import {htmlSafe} from '@ember/string';
import fetch from 'ember-fetch/ajax';
import config from 'livarava-jobs-ember/config/environment';

// noinspection JSUnusedGlobalSymbols
export default Service.extend({
  // Services
  store: service(),
  session: service(),
  cookies: service(),
  // moment: service(),

  // Properties
  token: config.api.token,
  data: null,
  signed: null,
  user: null,

  // Variables
  id: reads('data.id'),
  admin: reads('data.admin'),
  email: reads('data.email'),
  phone: reads('data.phone'),
  firstname: reads('data.firstname'),
  lastname: reads('data.lastname'),
  fullname: reads('data.fullname'),
  locale: reads('data.locale'),
  timezone: reads('data.timezone'),

  // Computed Variables
  rights: reads('data.rights'),
  imageStyle: computed('data.image_url', function () {
    const imageUrl = get(this, 'data.image_url');
    return htmlSafe(`background-image: url(${imageUrl});`);
  }),

  write(token, data) {
    console.log('Writing session data...');
    console.log('Token: ', token);

    // Write token to Session
    set(this, 'session.token', token);

    // Write token and data to local storage
    set(this, 'token', token);
    set(this, 'data', data);
    set(this, 'signed', true);

    // Load User
    get(this, 'store').findRecord('user', data.id)
      .then((user) => set(this, 'user', user));

    // Set moment timezone
    // const timezone = get(this, 'timezone');
    // const moment = get(this, 'moment');

    // moment.setTimeZone(timezone);
  },

  clear() {
    // Clear token from Session
    get(this, 'session').set('token', null);

    // Clear token from Cookies
    get(this, 'cookies').clear('token');

    // Clear data from local storage
    set(this, 'token', null);
    set(this, 'data', null);
    set(this, 'signed', false);
    set(this, 'user', null);
  },

  // Load
  load(token) {
    const sessionToken = get(this, 'session.token');
    const cookiesToken = get(this, 'cookies').read('token');
    if (!token) token = sessionToken || cookiesToken;
    if (!token) return;

    const options = {headers: {'X-LivaRava-Token': token}};
    const host = config.api.host;
    const path = config.api.path;
    const time = new Date().getTime();
    const site = config.APP.neuronet.uid;

    let url = `${host}${path}/me` +
      `?__t=${time}` +
      `&site=${site}`;

    let request = fetch(url, options);

    request.then((response) => {
      const data = response.data;

      // Write data from remote server
      this.write(token, data);

      return data;
    }).catch(() => {
      // Do something
    });

    return request;
  },

  reload() {
    const token = get(this, 'token');
    if (!token) return;

    const options = {headers: {'X-LivaRava-Token': token}};
    const host = config.api.host;
    const path = config.api.path;
    const time = new Date().getTime();
    const site = config.APP.neuronet.uid;

    let url = `${host}${path}/me` +
      `?__t=${time}` +
      `&site=${site}`;

    let request = fetch(url, options);

    request.then((response) => {
      const data = response.data;

      // Write data from remote server
      this.write(token, data);

      return data;
    }).catch(() => {
      // Do something
    });

    return request;
  },

  // Sign Up
  signUp(firstname, lastname, phone, email, password, invitationId = null) {
    const host = config.api.host;
    const path = config.api.path;
    const time = new Date().getTime();
    const site = config.APP.neuronet.uid;

    let url = `${host}${path}/signup/` +
      `?__t=${time}` +
      `&firstname=${firstname}` +
      `&lastname=${lastname}` +
      `&phone=${phone}` +
      `&email=${email}` +
      `&password=${password}` +
      `&site=${site}`;
    url += (invitationId) ? `&invitation=${invitationId}` : '';

    let request = fetch(url);

    request.then((response) => {
      const token = response.token;
      const data = response.data;

      this.write(token, data);
    }).catch(() => {
      // Do something
    });

    return request;
  },

  // Sign In
  signIn(login, password) {
    const host = config.api.host;
    const path = config.api.path;
    const time = new Date().getTime();
    const site = config.APP.neuronet.uid;

    const url = `${host}${path}/signin/` +
      `?__t=${time}` +
      `&login=${login}` +
      `&password=${password}` +
      `&site=${site}`;

    let request = fetch(url);

    request.then((response) => {
      const token = response.token;
      const data = response.data;

      if (response.error) {
        return;
      }

      this.write(token, data);
    }).catch(() => {
      // Do something
    });

    return request;
  },

  // Sign Out
  signOut() {
    const host = config.api.host;
    const path = config.api.path;
    const time = new Date().getTime();
    const token = get(this, 'token');
    const site = config.APP.neuronet.uid;

    let url = `${host}${path}/signout/` +
      `?__t=${time}` +
      `&token=${token}` +
      `&site=${site}`;

    let request = fetch(url);

    request.then(() => {
      this.clear();
    }).catch(() => {
      // Do something
    }).finally(() => {
      // Do something
    });

    return request;
  },
});
