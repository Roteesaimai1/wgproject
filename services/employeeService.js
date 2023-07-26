const db = require('./db');


async function getMultiple(){
  const dataDB = await db.query(
    `SELECT * FROM employee `
  );
  const data = dataDB;

  return {
    data,
  }
}

module.exports = {
  getMultiple
}