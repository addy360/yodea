const Idea = require('../models/Idea')
exports.getIdeas = (req, res, next)=>{
	Idea.find().sort({date:"desc"})
	.then(results=>{
		const context = {ideas:[]}
		if (results) {
			results.map(idea=>{
				const {_id , title, details, date} = idea
				context.ideas.push({idea:{id:_id, title,details, date}})
			})
		}
		res.render('ideas/idea-list',context)
	})
	.catch(err=>{
		console.log(err)
		res.send("Server Error")
	})
}

exports.addIdea = (req, res, next) =>{
	res.render("ideas/add")
}

exports.postIdea = (req, res, next)=>{
	const { title, details } = req.body
	const errors = []
	if (!title) errors.push({message:"Title field is required"})
	if (!details) errors.push({message:"Details field is required"})
	if(errors.length > 0) return res.render('ideas/add',{errors, title, details})
	const newIdea = {
		title,details
	}
	new Idea(newIdea).save()
	.then(results=>{
		res.redirect("/ideas")
	})
	.catch(err=>{
		console.log(err)
		res.send("Server error")
	})
}

exports.editIdea = (req, res, next) =>{
	const {id} = req.body
	Idea.findOne({_id:id})
	.then(data=>{
		res.render("ideas/edit", data)
	})
	.catch(err=>{
		console.log(err)
		res.send("Server Error")
	})
}
exports.updateIdea = (req, res, next) =>{
	const {id, title, details} = req.body
	Idea.findOneAndUpdate({_id:id},{title, details})
	.then(data=>{
		res.redirect("/ideas")
	})
	.catch(err=>{
		console.log(err)
		res.send("Server Error")
	})
}
exports.deleteIdea = (req, res, next) =>{
	const {id} = req.body
	Idea.findOneAndDelete({_id:id})
	.then(data=>{
		console.log(data)
		res.redirect('/ideas')
	})
	.catch(err=>{
		console.log(err)
		res.send("Server Error")
	})
}