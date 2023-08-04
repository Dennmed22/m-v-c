const express = require('express');
const router = express.Router();
const { Record } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const recordData = await Record.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const records = postData.map((record) => record.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dash',
      records,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dash',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const recordData = await Record.findByPk(req.params.id);

    if (recordData) {
      const record = recordData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dash',
        record,
      });
    } else {
      res.status(404).end();
      res.status(200).json(recordData);
    }
  } catch (err) {
    res.redirect('login');
    res.status(500).json(err);
  }
});

module.exports = router;