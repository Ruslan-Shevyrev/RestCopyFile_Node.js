# RestCopyFile

Rest API to copy files from Oracle database and save to disk.\
You can use this when you need a service to copy files from an ORACLE database and save to disk. For example, a service might copy the last file loaded into Oracle database and put it in a directory that is used by other devices that don't have access to the database.

## Install

### Install like npm package (option 1)

```
npm install restcopyfile
```

### Install like service (Option 2)

```
1. https://codeload.github.com/Ruslan-Shevyrev/RestCopyFile-nodejs/zip/refs/heads/master
2. npm install
```

## Start

### Option 1

If you installed it like npm package ***(option 1)***, then:

```
const restcopyfile = require('restcopyfile');
webServerConfig = {
  port: process.env.HTTP_PORT || /*listener_port*/ 3000,
  file_path: "DEFAULT_FILE_PATH"
};

dbConfig = {
	hrPool: {
		user          : "DB_USER",
		password      : "DB_PASSWORD",
		connectString : "DB_LINK",
		poolMin: 10,
		poolMax: 10,
		poolIncrement: 0
	  }
};

query = {
  DEFAULT_SQL_GET_FILE     : "SQL_QUERY_RETURN_FILE_NAME_&_BLOB"
};

restcopyfile.startup(webServerConfig, dbConfig, query);
```

### Option 2

If you installed it like service ***(option 2)***, then:

1. Change configuration in files:
```
./config/dbconfig.js
./config/web-server-config.js
./DBquery/query.js
```

2. Run service
```
node RestCopyFileStart.js
```

## Config

### webServerConfig (webServerConfig.js)

**listener_port :** port ***(default 3000)***
**file_path :** default path for files

### dbConfig (dbconfig.js)

**user          :** database user,\
**password      :** database password,\
**connectString :** database connection string 
```
<server>:<port>/<DB>
```
**poolMin		:** Min connection pool ***(default 10)***,\
**poolMin		:** Max connection pool ***(default 10)***,\
**poolIncrement	:** Pool Increment ***(default 0)***

### query (query.js)

**DEFAULT_SQL_GET_FILE :** SQL query from database with string filename as first value and blob as second value using {:id} as indicator

***Example query:***
```
SELECT FILE_NAME, BDATA FROM TEMP_IMAGE WHERE ID = :id
```

## Using

```
<host>:<listener_port>/file/put/<file id from database>/?parameters
```
parameters:

***path :*** path for saving file (DEFAULT : file_path from webServerConfig(webServerConfig.js))
***query :*** set query for blob. You can set more than one predetermined query (you need one query named **DEFAULT_SQL_GET_FILE** by default)

```
query = {
  DEFAULT_SQL_GET_FILE : "SQL_QUERY_RETURN_FILE_NAME_&_BLOB",
  SECOND_SQL : "SECOND_SQL",
  THIRD_SQL : "THIRD_SQL"
};
```
<p align="left">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logo_mini.gif" width="49%" title="logo">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logoRS_FULL.png" width="49%" title="RuslanShevyrev" >
</p>