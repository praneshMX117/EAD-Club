const express = require('express');
const mongoose = require('mongoose');

const dataRoutes = require('./routes/functions');

const app = express();

mongoose.connect('mongodb://127.0.0.1/PostAppDatabase'
  ,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(() =>{
    console.log('Connection Failed!');
  });


app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  )
  next();
})

app.use("/api/data",dataRoutes);
module.exports = app;
