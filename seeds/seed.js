const sequelize = require("../config/connection");
const { User, Review, Comment } = require("../models");

const userData = require("./userData.json");
const reviewData = require("./reviewData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of reviewData) {
    await Review.create({
      ...review,
      description: review.description,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      body: comment.body,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
