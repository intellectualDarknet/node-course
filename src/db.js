import pg from 'pg'

const newPool = new pg.Pool({
  user: 'postgres',
  password: '54321',
  host: 'localhost',
  port: 5432,
  database: 'node_postgres'
})

export default newPool
