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
  cookie: { maxAge: 1200000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 
  })
}));

//middleware functions

function protect(req,res,next){
  if(req.session.currentUser) next();
  else res.redirect("/");
}

function addUserObject(req, res, next){
  if(req.session.currentUser){
    res.locals.user = req.session.currentUser;
  }
  next();
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(favicon(path.join('public', 'images', 'favicon.ico')));
hbs.registerPartials(__dirname + '/views/partials');



const index = require('./routes/index');
const signup = require("./routes/signup");
const login = require("./routes/login");
const profile = require("./routes/user/profile");
const edit = require("./routes/user/edit-profile")
const logout = require("./routes/user/logout")
const bandCreate = require("./routes/band/createband")
const bandProfile = require("./routes/band/band-profile")
const bandFind = require("./routes/user/bandfind")
const memberFind = require("./routes/band/memberfind")
const profileDetail = require("./routes/user/profile-detail")
const editBand = require("./routes/band/band-edit")
const bandDetail = require("./routes/band/band-detail")
const addMember = require("./routes/band/add-member")

app.use(addUserObject);

app.use('/', index);
app.use('/', signup);
app.use('/', login);
app.use('/', profile);
app.use('/', edit);
app.use('/', logout);
app.use('/', bandCreate);
app.use('/', bandProfile);
app.use('/', bandFind);
app.use('/', memberFind);
app.use('/', profileDetail);
app.use('/', editBand);
app.use('/', bandDetail);
app.use('/', addMember);

app.use((err,req,res,next)=>{
  res.render("error.hbs",{message:err})
})

module.exports = app;
