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
