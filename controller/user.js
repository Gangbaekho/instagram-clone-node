const User = require("../model/user");
const Follow = require("../model/follow");

exports.createUser = (req, res, next) => {
  const user = new User({
    email: "test@test.com",
    password: "test",
    profileImageUrl: "test",
  });

  user
    .save()
    .then((user) => {
      const follow = new Follow({
        followerId: user._id.toString(),
        followeeId: user._id.toString(),
      });
      return follow.save();
    })
    .then((result) => {
      res.json({ message: "success user create" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.findUsers = (req, res, next) => {
  const nickName = req.params.nickName;
  User.find(
    { nickName: { $regex: `.*${nickName}.*` } },
    { nickName: 1, profileImageUrl: 1, userName: 1 }
  )
    .limit(20)
    .then((users) => {
      if (!users) {
        res.json({ message: "not found", users: [] });
      }
      res.json({ message: "success finding users", users: users });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
