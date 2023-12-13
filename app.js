const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user')
const tariffRoutes = require('./routes/tariff')


mongoose.connect("mongodb+srv://Roma:"+"s6X6zJzubksiK8k4"+"@smartmobile.yilijla.mongodb.net/?retryWrites=true&w=majority")
//mongodb+srv://Roma:<password>@smartmobile.yilijla.mongodb.net/?retryWrites=true&w=majority  

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

app.use('/user', userRoutes)
app.use('/tariff',tariffRoutes)


app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req,res,next) => {
    res.status(error.status || 500)
    res.json({
      error:{
        message: error.message
      }
    })
})


module.exports = app;