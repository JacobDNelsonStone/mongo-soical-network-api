const router = require("express").Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allThoughts = await Thought.find()

    res.status(200).json({ allThoughts });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      { thought: newThought._id },
      { new: true }
    );
    res.status(200).json({ thought: newThought, updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})


module.exports = router; 