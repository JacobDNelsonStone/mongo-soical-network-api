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

router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id)

    res.status(200).json({ thought });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      { thoughts: newThought._id },
      { new: true }
    );
    res.status(200).json({ thought: newThought, updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate({ _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({ updatedThought });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
  console.log(req.params.thoughtId);
  try {
    const thoughtReaction = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId },
      { reactions: req.body },
    )
    console.log(userFriend);

    res.status(200).json({ userFriend });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.delete('/:id', async (req, res) => {

  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id)
    res.status(202).json({ message: 'Thought deleted', payload: deletedThought });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

module.exports = router; 