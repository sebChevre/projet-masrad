//citizen api
var API_BASE_URI = 'https://comem-citizen-engagement.herokuapp.com/api';
app.constant('API_LOGIN_URL', API_BASE_URI + '/auth');
app.constant('API_USER_URL', API_BASE_URI + '/users');
app.constant('API_ALL_ISSUES', API_BASE_URI + '/issues?include=creator');
app.constant('API_MY_ISSUES', API_BASE_URI + '/me/issues?include=creator');

