const oracledb = require('oracledb');
const defaultThreadPoolSize = 4;
 
async function initialize(dbConfig) {
  console.log("creating connection pool")
  process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;
  const pool = await oracledb.createPool(dbConfig.hrPool);
}
 
module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close();
}
 
module.exports.close = close;

function Execute(statement, binds, opts = {}) {
	return new Promise(async (resolve, reject) => {
    let conn;
 
    opts.outFormat = oracledb.OUT_FORMAT_ARRAY;
 
	 try {
		oracledb.fetchAsBuffer = [ oracledb.BLOB ];
	  } catch (err) {
		console.error(err);
		process.exit(1);
	  }; 
 
    try {
      conn = await oracledb.getConnection();
 
      const result = await conn.execute(statement, binds, opts);
 
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}
 
module.exports.Execute = Execute;