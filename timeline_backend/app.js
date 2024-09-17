import express from 'express'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'
const app = express()
const port = 3000

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'


applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

const INSERT_DATA_SQL = 'INSERT INTO TestData(value) VALUES (?) RETURNING id;'
const GET_DATA_SQL = 'SELECT * FROM TestData'

const db = await open({
  filename: "./db.db",
  driver: sqlite3.Database
});

await db.exec("CREATE TABLE IF NOT EXISTS TestData(id INTEGER PRIMARY KEY UNIQUE, value TEXT NOT NULL);")


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.status(200).send({msg:tmp_mem})
})

app.post('/test_put', async (req, res) => {
  try {
    const ret = await db.get(INSERT_DATA_SQL, req.body.data)
    console.log(ret)
    res.status(200).send(ret)
  } catch (e) {
    res.status(500).send({msg:"something went wrong"})
    console.log(e)
  }
})

app.get('/test_get', async (req, res) => {
  try {
    const ret = await db.all(GET_DATA_SQL)
    console.log(ret)
    res.status(200).send(ret)
  } catch (e) {
    res.status(500).send({msg:"something went wrong"})
    console.log(e)
  }
})


applyErrorCatching(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
