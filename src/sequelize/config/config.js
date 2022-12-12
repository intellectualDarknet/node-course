module.exports = {
  development: {
    database: 'node_postgres',
    username: 'postgres',
    password: '54321',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '54321',
    database: 'node_postgres',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    url: process.env.NODE_ENV,
    password: '54321',
    database: 'node_postgres',
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnathorized: false
      }
    }
  }
}
