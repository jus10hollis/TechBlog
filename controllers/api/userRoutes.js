const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        if (err.original.code === "ER_DUP_ENTRY") {
          res.status(400).json("Email Already Exist, Please Sign up with different email");
        } else {
          res.status(400).json(err);
        }
    }
});

router.post('/login', async (req, res) => {
  console.log("*********");
  console.log(req.body);
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(userData);
        if(!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password'});
        return; 
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password'});
            return;
        }

       req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'Welcome to your very own "Bearded Review" account' });
       })
    } catch (err) {
        res.status(400).json(err);
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