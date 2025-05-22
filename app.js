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
const MongoStore = require("connect-mongo");

const mongoUsername = process.env.MONGOUSERNAME
const mongoPassword = process.env.MONGOPASSWORD
const mongoUri = `mongodb+srv://${mongoUsername}:${encodeURIComponent(mongoPassword)}@cluster0.bjna4yv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection
(async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB! Database name: "${mongoose.connection.name}"`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
})();

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set mongoose options
mongoose.set('strictQuery', false);

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// Configure sass middleware
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  sourceMap: true
}));

// Session configuration
const sessionStore = MongoStore.create({
  mongoUrl: mongoUri,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60, // 1 day
  autoRemove: 'native' // Remove expired sessions automatically
});

// Catch errors in the session store
sessionStore.on('error', function(error) {
  console.error('Session store error:', error);
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "fallback-secret-key",
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  },
  store: sessionStore,
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something is stored
  unset: 'destroy' // Delete the session when unset
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // Trust first proxy
  sessionConfig.cookie.secure = true; // Serve secure cookies
}

app.use(session(sessionConfig));

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
