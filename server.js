var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('./config/passport')
var util = require('./util')
var app = express()

mongoose.connect('mongodb://localhost/more', async(err) => {
    if(err) throw err;
})

// Other settings
app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Custom Middlewares
app.use(function(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.currentUser = req.user
  res.locals.util=util
  next()
})

// Routes
app.use('/', require('./routes/home'))
app.use('/posts', util.getPostQueryString, require('./routes/post'))
app.use('/users', require('./routes/user'))
app.use('/comments', util.getPostQueryString, require('./routes/comment'))
app.use('/files', require('./routes/file'));

app.listen(3000)