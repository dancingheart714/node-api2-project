// implement your posts router here
const router = require('express').Router();
const Posts = require('./posts-model');

//GET
router.get('/api/posts', (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'The posts information could not be retrieved',
      });
    });
});

//GET BY ID
router.get('/api/posts/:id', (req, res) => {
  Posts.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({
          message: 'The post with the specified ID does not exist',
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: 'The post information could not be retrieved',
          });
        });
    }
  });
});

//POST
router.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: 'Please provide title and contents for the post',
    });
  }
  Posts.insert(req.body)
    .then((post) => {
      Posts.findById(post.id)
        .then((confirmation) => {
          res.status(201).json(confirmation);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({
            message: 'Does not exist',
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'There was an error while saving the post to the database',
      });
    });
});

//PUT
router.put('/api/posts/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: 'Please provide title and contents for the post',
    });
  }
  Posts.update(req.params.id, req.body)
    .then((post) => {
      Posts.findById(req.params.id)
        .then((success) => {
          res.status(200).json(success);
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({
            message: 'The post with the specified ID does not exist',
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be modified',
      });
    });
});

//DELETE
router.delete('/api/posts/:id/comments', (req, res) => {
  Posts.remove(req.params.id).then(
    ((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist',
        });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'The post could not be removed',
      });
    })
  );

  //GET findPostComments
  router.get('/api/post/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'The comments information could not be retrieved',
        });
      });
  });
});

router.get('/', (req, res) => {
  res.json({ message: 'May the 4th Be With You' });
});

module.exports = router;
