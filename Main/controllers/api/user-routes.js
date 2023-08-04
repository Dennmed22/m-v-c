const express = require('express');
const router = express.Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save();

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData || !(await userData.checkPassword(req.body.password))) {
      res.status(400).json({ message: 'Invalid email/password, try again please' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save();

    res.json({ user: userData, message: 'Login sucessfull!' });
  } catch (err) {
    res.status(400).json({ message: 'Account not found under user!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;