const router = require("express").Router();
const { User, Group } = require('../models');

// const apiRoutes = require('./apiRoutes');

// router.use('/api', apiRoutes);

// ======== User Routes ========== //

router.get('/user', async (req, res) => {
  try {
    const allUsers = await User.find().populate({ path: "group" })
    console.log(allUsers[0].firstNameAndEmail);

    res.status(200).json({ allUsers });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.post('/user', async (req, res) => {
  // "groupId"
  // One way of modifying req.body before submitting data
  // const modifiedReqBody = {...req.body, group: req.body.groupId}
  try {
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.status(200).json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

// ========== Group Routes ========== //

router.get('/group', async (req, res) => {
  try {
    const allGroups = await Group.find()

    res.status(200).json({ allGroups });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.post('/group', async (req, res) => {
  try {
    const newGroup = await Group.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      { group: newGroup._id },
      { new: true }
    );
    res.status(200).json({ group: newGroup, updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

module.exports = router;