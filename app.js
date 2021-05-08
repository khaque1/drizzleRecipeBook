const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeRoutes = require('./api/routes/recipes');

mongoose.connect('mongodb+srv://khaque:' + process.env.MONGO_ATLAS_PW +
    '@cluster0.ldthv.mongodb.net/test?retryWrites=true&w=majority',
    {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    
    app.use('/uploads', express.static('uploads'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods',
                'PUT, POST, PATCH, DELETE, GET'
            );
            return res.status(200).json({});
        }
        next();
    });
    
    app.use(express.static(__dirname));
    console.log("This is the directory listed in __dirname " + __dirname);
    app.use('/styles', express.static(__dirname));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/scripts', express.static(__dirname + '/scripts'));
    
    // Routes which should handle requests
    app.use('/recipes', recipeRoutes);
    
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
    
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });
    
    module.exports = app;
    