var fs = require("fs");

var friends = require(__dirname + "/../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    
	app.post("/api/friends", function(req, res) {
	    var friendReqDotBody = req.body;

	
	    //console.log(friendReqDotBody);

	    var namePhoto = friendFinder(friendReqDotBody);

        friends.push(friendReqDotBody);
        
	    makeFriendsFile();

	    res.json(namePhoto);
	});








	function friendFinder(friendReqDotBody) {
        
        var namePhoto = {
			"name": "",
			"photo": ""
		};

		
        var a = 0;
        var b = (5 * friendReqDotBody.scores.length) + 1;

		for(var i = 0; i < friends.length; i++) {

			a = 0;

			for(var j = 0; j < friendReqDotBody.scores.length; j++) {
                //Returning absolute value
				a += Math.abs(parseInt(friendReqDotBody.scores[j]) - parseInt(friends[i].scores[j]));
            
            }
            

			if(a < b) {
                
                b = a;
                
                
                namePhoto.name = friends[i].name;
                
                namePhoto.photo = friends[i].photo;
			}
		}

		return namePhoto;
    }
    





	function makeFriendsFile() {
		var fileName = __dirname + "/../data/friends.js";

		fs.writeFile(fileName, "var friends = ", function (err) {
            if (err) throw err;
            
			fs.appendFile(fileName, JSON.stringify(friends, null, 4) + ";", function (err) {
                if (err) throw err;
                
				fs.appendFile(fileName, "\n\nmodule.exports = friends;", function (err) {
					if (err) throw err;
				});    
			});
		});
	}
}