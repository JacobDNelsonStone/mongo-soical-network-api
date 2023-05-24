const router = require("express").Router();
const { User, Thought } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find()
    console.log();

    res.status(200).json({ allUsers });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    console.log();

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {

  try {
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.status(200).json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {

  try {
    console.log(req.body)
    const updatedUser = await User.findByIdAndUpdate({_id: req.params.id},
      req.body,
      { new: true }
    );
    res.status(200).json({ updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(202).json({ message: 'User deleted', payload: deletedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})


module.exports = router;