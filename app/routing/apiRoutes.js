var friendsData = require("../data/friends.js");

module.exports = function(app) {
  //GET route with URL /api/friends, this is used to display the JSON of possible friends
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  //A POST route with URL /api/friends. This is used to handle compatibility logic
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from user
    var newFriend = req.body;
    var newFriendScores = newFriend.scores;

    // parse for scores
    for (var i = 0; i < newFriendScores.length; i++) {
      newFriendScores[i] = parseInt(newFriendScores[i]);
    }

    var maxDifference = 40;

    // loop through friends data array, start of with 0 difference and compare user to each users score one set at a time.
    // take difference and add to the total difference
    for (var i = 0; i < friendsData.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friendsData[i].scores.length; j++) {
        var difference = Math.abs(
          newFriendScores[j] - friendsData[i].scores[j]
        );
        totalDifference += difference;
      }

      if (totalDifference < maxDifference) {
        maxDifference = totalDifference;

        matchedFriend = friendsData[i].name;
        matchedPhoto = friendsData[i].photo;
      }
    }

    // after finding match, push user to friend array
    friendsData.push(newFriend);

    // send friend match to json response
    res.json({
      status: "OK",
      matchedFriend: matchedFriend,
      matchedPhoto: matchedPhoto
    });
  });
};
