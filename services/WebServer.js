const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const database = require('./database.js');
let server;

function initialize(webServerConfig, query) {
  return new Promise((resolve, reject) => {
    const app = express();
	
    app.use(morgan('combined'));
	  app.get("/file/put/:id?", async (req, res) => {
		try {
			if (req.params.id!=undefined){
					binds = {id : req.params.id}
			}
					
				let QUERY = query.DEFAULT_SQL_GET_FILE;
					
				if (req.query.query != undefined){
					QUERY = query[req.query.query];
				}
					
				result = await database.Execute(QUERY, binds);
				
				fs.writeFileSync(webServerConfig.file_path+result.rows[0][0], result.rows[0][1]);
				res.end('success');				
		}
		catch (err){
			res.status(500).send(err.toString());
		}
    });
 
    server = app.listen(webServerConfig.port)
		.on('listening', () => {
			console.log('server awaiting...');
 
			resolve();
		})
		.on('error', err => {
			reject(err);
		});
  });
}
 
module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
 
      resolve();
    });
  });
}
 
module.exports.close = close;