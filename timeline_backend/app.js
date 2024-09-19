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

const INSERT_TIMEBLOCK_SQL = 'INSERT INTO TimelineBlocks(event, description, start, end) VALUES (?, ?, ?, ?) RETURNING id;'
const GET_TIMEBLOCK_ALL_SQL = 'SELECT * FROM TimelineBlocks'

const db = await open({
  filename: "./db.db",
  driver: sqlite3.Database
});

await db.exec("CREATE TABLE IF NOT EXISTS TestData(id INTEGER PRIMARY KEY UNIQUE, value TEXT NOT NULL);")
await db.exec("CREATE TABLE IF NOT EXISTS TimelineBlocks("+
  "id INTEGER PRIMARY KEY UNIQUE, "+
  "event TEXT NOT NULL, "+
  "description TEXT NOT NULL, "+
  "start INTEGER NOT NULL, "+
  "end INTEGER "+
  ");")


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.status(200).send({msg:tmp_mem})
})

app.post('/test_put', async (req, res) => {
  try {
    const ret = await db.get(INSERT_DATA_SQL, req.body.data)
    res.status(200).send(ret)
  } catch (e) {
    res.status(500).send({msg:"something went wrong"})
    console.log(e)
  }
})

app.get('/test_get', async (req, res) => {
  try {
    const ret = await db.all(GET_DATA_SQL)
    res.status(200).send(ret)
  } catch (e) {
    res.status(500).send({msg:"something went wrong"})
    console.log(e)
  }
})

// post a timeblock record
app.post('/timeline', async (req, res) => {
  try{
    const ret = await db.get(INSERT_TIMEBLOCK_SQL, req.body.event, req.body.description, req.body.start, req.body.end)
    res.status(200).send(ret)
  } catch(e) {
    res.status(500).send({msg:"something went wrong"})
    console.log(e)
  }
})

// get all timeblock records
app.get('/timeline', async (req, res) => {
  try{
    const ret = await db.all(GET_TIMEBLOCK_ALL_SQL)
    res.status(200).send(ret)
  } catch(e) {
    res.status(500).send({msg:"something went wrong"})
    console.log(e)
  }
})

// change a timeblock

// delete a timeblock


app.get('/timeline')

applyErrorCatching(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
