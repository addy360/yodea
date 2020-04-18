const router = require("express").Router()
const { addIdea, getIdeas, postIdea, updateIdea, deleteIdea, editIdea,  } = require("../controllers/ideaController")


router.get("/", getIdeas)
router.get("/add", addIdea)
router.post("/add", postIdea)
router.post("/edit", editIdea)
router.post("/delete", deleteIdea)
router.post("/update", updateIdea)

module.exports = router