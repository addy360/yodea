const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
const PORT = process.env.PORT 

app.get("/",(req, res, next)=>{
	res.render('index')
})
app.listen(PORT,()=>{
	console.log(`Server started at ${PORT}`)
})