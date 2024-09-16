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

const db = await open({
  filename: "./db.db",
  driver: sqlite3.Database
});

let tmp_mem = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test/:uid', (req, res) => {
  res.status(200).send({msg:tmp_mem})
})

app.post('/test_put', (req, res) => {
  tmp_mem = [...tmp_mem, req.body.data]
  res.status(200).send({msg:"done"})
  
})

applyErrorCatching(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
