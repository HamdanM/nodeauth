const express   = require('express');
const path      = require('path');
const cors      = require('cors');
const ex_sess   = require('express-session');
const mongoose  = require('mongoose');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

const app = express();

const isProduction= process.env.NODE_ENV === 'production';

mongoose.promise = global.Promise;

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({secret: 'nodeauth', cookie: {maxAge: 50000}, resave: false, saveUnintialized:false}));

if(!isProduction){
    app.use(errorHandler());

}

mongoose.connect('mongodb://localhose/nodeauth');
mongoose.set('debug', true);

if(isProduction){
    //do some error handling here
}

app.use('/', (req,res)=>{
    res.send('developing auth app');
})

app.use((err,req,res)=>{
    res.status(err.status||500);

    res.json({
        errors:{
            message:err.message,
            error:{},
        },
    });
});

app.listen(8000, ()=>console.log('server running on 8000'))