var friendsData = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newFriend = req.body;
    var newFriendScores = newFriend.scores;

    // parse for scores
    for (var i = 0; i < newFriendScores.length; i++) {
      newFriendScores[i] = parseInt(newFriendScores[i]);
    }

    var minimumDifference = 40;

    // loop through friends data array, start of with 0 difference and compare user to the ith friend scores, one set at a time.
    // take that difference and add to the total difference
    for (var i = 0; i < friendsData.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friendsData[i].scores.length; j++) {
        var difference = Math.abs(
          newFriendScores[j] - friendsData[i].scores[j]
        );
        totalDifference += difference;
      }

      if (totalDifference < minimumDifference) {
        minimumDifference = totalDifference;

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
