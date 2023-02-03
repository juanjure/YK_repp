require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const router = express.Router()
const { Pool } = require('pg')
const app = express()

const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.db_pg,
    ssl: {
      rejectUnauthorized: false
    }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.post('/create', async (req, res) => {
    const {TIEMPO, TEMPERATURA, HUMEDAD, LUZ, PUMP} = req.body;
    const client = await pool.connect();
    try {
      await client.query(`INSERT INTO mds (TIEMPO, TEMPERATURA, HUMEDAD, LUZ, PUMP) VALUES('${TIEMPO}', ${TEMPERATURA} , ${HUMEDAD} , ${LUZ} , '${PUMP}')`);
      res.send('NUEVOS DATOS CREADOS');
    } finally {
      client.release();
    }
  });
  
  app.get('/read', async (req, res) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query('SELECT * FROM mds s');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error reading from database' });
    } finally {
      client.release();
    }
  });
  
  app.get('/read_last_20', async (req, res) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query('SELECT * FROM mds ORDER BY id DESC LIMIT 20');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error reading from database' });
    } finally {
      client.release();
    }
  });
  
  app.get('/lumi', async (req, res) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query('SELECT LUZ FROM MDS ORDER BY id DESC LIMIT 1');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error reading from database' });
    } finally {
      client.release();
    }
  });
  
  app.get('/temp', async (req, res) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query('SELECT TEMPERATURA FROM MDS ORDER BY id DESC LIMIT 1');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error reading from database' });
    } finally {
      client.release();
    }
  });
  
  app.get('/hume', async (req, res) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query('SELECT HUMEDAD FROM MDS ORDER BY id DESC LIMIT 1');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error reading from database' });
    } finally {
      client.release();
    }
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;