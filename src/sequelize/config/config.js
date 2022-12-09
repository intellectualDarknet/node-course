export default {
  development: {
    username: 'postgres',
    password: '54321',
    database: 'node_postgres',
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
