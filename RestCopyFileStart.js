const RestCopyFile = require('./RestCopyFile.js');
const webServerConfig = require('./config/web-server-config.js');
const dbConfig = require('./config/dbconfig.js');
const query = require('./DBquery/query.js');

RestCopyFile.startup(webServerConfig, dbConfig, query);