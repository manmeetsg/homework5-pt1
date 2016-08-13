/* Discussed with Alex Beals and worked with him on this */
import Post from '../models/post_model';

// Create a new post in the format our front end likes
export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags.split(' ');
  post.content = req.body.content;
  // copied from Tim
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

// Get the posts
export const getPosts = (req, res) => {
  Post.find().sort('-created_at').exec((err, posts) => {
    if (err) {
      res.json({ message: `Error: ${err}` });
    } else {
      res.json(posts.map(post => {
        return {
          id: post._id,
          tags: post.tags,
          title: post.title,
        };
      }));
    }
  });
};

// Get a single post
export const getPost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({ message: `Error: ${err}` });
    } else {
      res.json({
        id: post._id,
        tags: post.tags,
        title: post.title,
        content: post.content,
      });
    }
  });
};

// Delete a post
export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json({ message: `Error: ${err}` });
    } else {
      res.json({ message: 'Deleted!' });
    }
  });
};

// Update a post
export const updatePost = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      res.json({ message: `Error: ${err}` });
    } else {
      res.json({ message: 'Updated!' });
    }
  });
};
