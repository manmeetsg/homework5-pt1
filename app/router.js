import { Router } from 'express';
import * as Posts from './controllers/post_controller';
// our imports as usual
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// Route to our methods from post_controllers.js
// Pretty straightforward
router.route('/posts')
  .post(Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);


export default router;
