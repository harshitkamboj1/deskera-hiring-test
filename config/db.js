const Pool = require('pg').Pool

const pool = new Pool({
  user: 'cwzqulfg',
  host: 'tyke.db.elephantsql.com',
  database: 'cwzqulfg',
  password: 'hooyzhGaH1jnt28X38S9FiUuLb3dLjDz',
  port: 5432,
})

module.exports = {
  pool
}