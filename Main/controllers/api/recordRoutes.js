const router = require('express').Router();
const { record } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE A BLOG POST
router.post('/', withAuth, async (req, res) => {
  try {
    const newrecord = await Record.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE A BLOG POST
//localhost:3001/api/blog/:id
router.put('/:id', async (req, res) => {
  try {
    const updaterecord = await Record.update(
      {
        title: req.body.title,
        content: req.body.content,
      },

      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updateRecord);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE A BLOG POST
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recordData = await Record.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recordData) {
      res.status(404).json({ message: 'No blog posts found with this id!' });
      return;
    }

    res.status(200).json(recordData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;