const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require("mongoose")
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')


const ideasRoutes = require('./routes/ideasRoutes')
const basicRoutes = require('./routes/basicRoutes')
const authRoutes = require('./routes/authRoutes')
const globalVars = require('./middlewares/global_vars')

const { isAuth } = require('./middlewares/isAuth')

const PORT = process.env.PORT 
const app = express()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
require('./config/passport')(passport)
// moddlewares
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'supersecretword',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(globalVars)
app.use("/",basicRoutes)
app.use("/ideas", isAuth, ideasRoutes)
app.use("/auth",authRoutes)

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@yodea-shard-00-00-mviyw.mongodb.net:27017,yodea-shard-00-01-mviyw.mongodb.net:27017,yodea-shard-00-02-mviyw.mongodb.net:27017/yodea?ssl=true&replicaSet=yodea-shard-0&authSource=admin&retryWrites=true&w=majority`,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useFindAndModify:false
})
.then(()=>{
	app.listen(PORT,()=>{
		console.log(`Server started at ${PORT}`)
	})
})
.catch(err=>{
	console.log(err)
})


