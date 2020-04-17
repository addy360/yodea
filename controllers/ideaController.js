exports.getIdeas = (req, res, next)=>{
	res.send("get Ideas")
}

exports.addIdea = (req, res, next) =>{
	res.render("ideas/add")
}

exports.postIdea = (req, res, next)=>{
	res.send(req.body)
}