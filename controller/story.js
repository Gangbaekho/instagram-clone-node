const Story = require("../model/story");

exports.createStory = (req, res, next) => {
  const story = new Story({
    userId: "60459cb019ffd74380d5b4ca",
    contentUrls: ["test", "test"],
  });

  story
    .save()
    .then((result) => {
      console.log("Story insert success!");
    })
    .catch((error) => {
      console.log(error);
    });
};
