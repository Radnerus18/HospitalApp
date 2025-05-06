import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Express-crud',
    password: '1803',
    port: 5432,
})
pool.on('connect',()=>{
    console.log('Database connection established')
})
export default pool