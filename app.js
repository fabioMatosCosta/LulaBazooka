require('dotenv').config();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const bcrypt     = require("bcrypt");
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

const mongoUsername = process.env.MONGOUSERNAME
const mongoPassword = process.env.MONGOPASSWORD


mongoose
  .connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0-v2ysd.mongodb.net/dopperdb`, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

//middleware functions

function protect(req,res,next){
  if(req.session.currentUser) next();
  else res.redirect("/");
}

function addUserObject(req, res, next){
  if(req.session.currentUser){
    req.locals.user = req.session.currentUser;
  }
  next();
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
hbs.registerPartials(__dirname + '/views/partials');


// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
const signup = require("./routes/signup")
const login = require("./routes/login")
const profile = require("./routes/profile")
const edit = require("./routes/edit-profile")
const logout = require("./routes/logout")
const bandCreate = require("./routes/createband")
const bandProfile = require("./routes/band-profile")

// app.use(addUserObject);
app.use('/', index);
app.use('/', signup);
app.use('/', login);
app.use('/', profile);
app.use('/', edit);
app.use('/', logout);
app.use('/', bandCreate);
app.use('/', bandProfile);
app.use((err,req,res,next)=>{
  res.render("error.hbs",{message:err})
})

module.exports = app;
