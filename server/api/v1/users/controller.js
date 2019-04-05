const {
  signToken,
} = require('./../auth');
const User = require('./model');
const Service = require('./service');

exports.signup = (req, res, next) => {
  const {
    body,
  } = req;

  const user = new User(body);

  user.save()
    .then((created) => {
      const token = signToken({
        id: created.id,
      });

      res.json({
        success: true,
        item: created,
        meta: {
          token,
        },
      });
    })
    .catch((error) => {
      next(new Error(error));
    });
};

exports.profile = async (req, res, next) => {
  const {
    decoded,
  } = req;
  const {
    id,
  } = decoded;

  // User.findById(id)
  //   .then((user) => {
  //     res.json({
  //       success: true,
  //       item: user,
  //     });
  //   })
  //   .catch((error) => {
  //     next(new Error(error));
  //   });

  const user = await Service.profile(id);
  res.json({
    success: true,
    item: user,
  });
};

exports.signin = (req, res, next) => {
  const {
    body,
  } = req;
  const {
    email,
    password,
  } = body;
  User
    .findOne({
      email,
    })
    .exec()
    .then((user) => {
      if (user && user.verifyPassword(password)) {
        const token = signToken({
          id: user.id,
        });
        res.json({
          success: true,
          item: user,
          meta: {
            token,
          },
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      next(new Error(error));
    });
};
