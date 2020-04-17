exports.getIndex = (req, res, next)=>{
	const message = "Welcome to the Yodea world!"
	const context = {
		welcome:message
	}
	res.render('index', context)
}



exports.getAbout = (req, res, next)=>{
	const context = {}
	res.render('about', context)
}