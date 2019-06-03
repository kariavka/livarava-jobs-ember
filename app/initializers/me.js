export function initialize(application) {
  application.inject('route', 'me', 'service:me');
  application.inject('controller', 'me', 'service:me');
  application.inject('component', 'me', 'service:me');
}

export default {
  name: 'me',
  initialize
};
