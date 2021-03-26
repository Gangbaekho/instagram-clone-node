const User = require("../model/user");

exports.createUser = (req, res, next) => {
  const user = new User({
    email: "test@test.com",
    password: "test",
    profileImageUrl: "test",
  });

  user
    .save()
    .then((user) => {
      console.log("Success");
    })
    .catch((error) => {
      console.log("error");
    });
};

exports.findUsers = (req, res, next) => {
  const nickName = req.params.nickName;
  // db.users.findOne({"username" : {$regex : ".*son.*"}});
  User.find(
    { nickName: { $regex: `.*${nickName}.*` } },
    { nickName: 1, profileImageUrl: 1 }
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
