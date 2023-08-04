const router = require('express').Router();
const { Record, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const recordData = await Record.findAll({
      include: [User, Comment],
    });

    const records = recordData.map((record) => record.get({ plain: true }));

    res.render('homepage', {
      records,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/record/:id', async (req, res) => {
  try {
    const recordData = await Record.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [User],
        },
        {
          model: User,
        },
      ],
      order: [[Comment, 'date_created', 'desc']],
    });

    const record = recordData.get({ plain: true });

    res.render('record', {
      ...record,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Record }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;