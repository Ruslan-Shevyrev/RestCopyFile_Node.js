const webServer = require('./services/WebServer.js');
const database = require('./services/database.js');

async function startup(webServerConfig, dbConfig, query) {
  console.log('starting service');
  
	try {
		console.log('starting database');
 
		await database.initialize(dbConfig); 
	} catch (err) {
		console.error(err);
 
		process.exit(1);
	}
  
  try {
    console.log('starting server');
    await webServer.initialize(webServerConfig, query);
  } catch (err) {
    console.error(err);
 
    process.exit(1);
  }
}

module.exports.startup = startup;

async function shutdown(e) {
  let err = e;
    
  console.log('Shutting down');
  
  try {
    console.log('Closing database');
 
    await database.close(); 
  } catch (err) {
    console.log('Encountered error', e);
 
    err = err || e;
  }
  
  try {
    console.log('Closing server');
 
    await webServer.close();
  } catch (e) {
    console.log('Encountered error', e);
 
    err = err || e;
  }
 
  console.log('Exiting process');
 
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
 
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
 
  shutdown();
});
 
process.on('SIGINT', () => {
  console.log('Received SIGINT');
 
  shutdown();
});
 
process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
  shutdown(err);
});