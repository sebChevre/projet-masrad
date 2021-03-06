//citizen api
var API_BASE_URI = 'https://masrad-dfa-2017-d.herokuapp.com/api';
app.constant('API_LOGIN_URL', API_BASE_URI + '/auth');
app.constant('API_USER_URL', API_BASE_URI + '/users');
app.constant('API_ALL_ISSUES', API_BASE_URI + '/issues?include=creator');
app.constant('API_MY_ISSUES', API_BASE_URI + '/me/issues?include=creator');
app.constant('API_NEW_ISSUES', API_BASE_URI + '/issues');
app.constant('API_ISSUES_TYPE', API_BASE_URI + '/issueTypes');
app.constant('API_BY_LOCATION', API_BASE_URI + '/issues/searches?include=creator');


