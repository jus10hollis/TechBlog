const router = require("express").Router();
const { Review, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const reviewsData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "rating"],
          include: [User],
        },
      ],
    });

    const reviews = reviewsData.map((review) => review.get({ plain: true }));

    res.render("homepage", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/reviews/:id", async (req, res) => {
  try {
    const reviewsData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "review_id", "user_id"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const review = reviewsData.get({ plain: true });
    console.log(review);
    res.render("review", {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] } /* ,
        include: [{ model: Project }], */,
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
