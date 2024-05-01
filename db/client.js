const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || "postgres://phuctdang:monkey1993@localhost:5432/juicebox");