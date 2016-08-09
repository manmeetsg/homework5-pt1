import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: { type: String, default: 'Untitled' },
  tags: [String],
  content: String,
});

// create a class for the model
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
