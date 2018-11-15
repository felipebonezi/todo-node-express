const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbHost = process.env.DB_HOST || 'x';
const dbPort = process.env.DB_PORT || '1';
const dbName = process.env.DB_NAME || 'd';
const dbUser = process.env.DB_USER || 'p';
const dbPassword = process.env.DB_PASSWORD || 'p';
const dbUrl = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({
    connectionString: dbUrl
});

pool.on('connect', () => {
    console.log(`PSQL connected to pool.`);
});

pool.on('remove', () => {
    console.log('PSQL removed from pool.');
});

module.exports = pool;