const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require("mongoose")
const ideasRoutes = require('./routes/ideasRoutes')
const basicRoutes = require('./routes/basicRoutes')

const app = express()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// moddlewares
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT 

app.use("/",basicRoutes)
app.use("/ideas",ideasRoutes)

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@yodea-shard-00-00-mviyw.mongodb.net:27017,yodea-shard-00-01-mviyw.mongodb.net:27017,yodea-shard-00-02-mviyw.mongodb.net:27017/yodea?ssl=true&replicaSet=yodea-shard-0&authSource=admin&retryWrites=true&w=majority`,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>{
	app.listen(PORT,()=>{
		console.log(`Server started at ${PORT}`)
	})
})
.catch(err=>{
	console.log(err)
})


