import User from '../models/User';
import Post from '../models/Post';

// READ
export const getUser = async (req, res) => { 
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await Post.findOne({ owner: id });

        res.status(200).json(posts);
    } catch (err) { 
        res.status(404).json({ message: err.message })
    }

}

// UPDATE
export const addUserPost = async (req, res) => {
    try {
        const { name, initGraphQuery, graphData, owner } = req.params;

        const post = new Post(name, initGraphQuery, graphData,owner);
        const savedPost = await post.save();

        res.status(201).json(savedPost);
    } catch (err) { 
        res.status(404).json({ message: err.message })
    }

}