const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Promise.destroy({
      where: {
        id: req.params.id,
        wher_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "Review not found, please try again" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
