const express = require('express');
const mongoose = require('mongoose');

const dataRoutes = require('./routes/functions');
const articles = require('./routes/article')
const newsRoutes = require('./routes/news')
const app = express();

mongoose.connect('mongodb://127.0.0.1/EadClub'
  ,{useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true ,  useFindAndModify: false })
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  )
  next();
})

app.use("/api/data",dataRoutes);
app.use("/api/articles",articles);
app.use("/api/news",newsRoutes);
module.exports = app;
