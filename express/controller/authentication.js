const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config({path: '.env'});

const mongoConnect = require('../util/database').mongoConnect;

exports.getLogin = async (req, res) => {
  mongoConnect(() => {
    const { username, password } = req.body;
    if (username && password) {
      const user = new User(username, password);
      user
        .findUser()
        .then(user => {
          if (user.length > 0) {
            const id = user[0]['_id'];
            const token = jwt.sign({ id }, process.env.JWT_KEY, {
              expiresIn: 600,
            });

            res.send({ message: 'user logged', token });
          } else {
            res.statusCode = 401;
            res.send({ message: 'user not found' });
          }
        })
        .catch(err => {
          res.statusCode = 500;
          res.send({ error: err });
        });
    } else {
      res.statusCode = 500;
      res.send({ error: 'Invalid params' });
    }
  })
};
