const db = require('./db');

//QUERY STAMP DATA
async function getMultiple(){
  const dataDB = await db.query(
    `SELECT fs.id, fs.status, fs.days, fs.money, fs.date_stamp, e.name, e.title FROM employee e INNER JOIN food_stamp fs ON e.id = fs.employee_id WHERE fs.date_stamp = '2023-07-26' `
  );
  const dataSum = await db.query(
    'SELECT SUM(money) AS total_money FROM food_stamp '
  );


  const data = dataDB;
  const totalsum = dataSum;
  
  return {
    data, 
    totalsum  
  }
}

module.exports = {
  getMultiple
}