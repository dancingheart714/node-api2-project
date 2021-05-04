// implement your posts router here
const router = require("express").Router()
const Posts = require("./posts-model")

//GET
router.get("/api.posts", (req, res) => {
    Posts.find(req.query)
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "The posts information could not be retrieved",
        })
    })
})


//GET BY ID
router.get("/api/posts/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(posts => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json ({
                message: "The post with the specified ID does not exist"});
            })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    })
}
})
})

//POST
router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents){
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    Posts.insert(req.body)
    .then((post) =>{
        res.status(201).json(post)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    })
})

//PUT
router.put("/api/posts/:id", (req, res) => {
    const changes = req.body;
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        }
    Posts.update(req.params.id, changes)    
    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post information could not be modified"
        })
    })

})

//DELETE
router.delete("/api/posts/:id/comments", (req, res) => {
    Posts.remove(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})

//GET findPostComments
router.get("/api/post/:id/comments" (req, res) => {
    Posts.findPostComments(req.params.id)
    .then((post) => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: The post with the specified ID does not exist"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})

module.exports = router

