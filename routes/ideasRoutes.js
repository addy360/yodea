const router = require("express").Router()
const { addIdea, getIdeas, postIdea } = require("../controllers/ideaController")

router.get("/", getIdeas)
router.get("/add", addIdea)
router.post("/add", postIdea)

module.exports = router