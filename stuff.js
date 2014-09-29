//STEP 1

var ref = new Firebase("https://rethinkdb.firebaseio.com/");
var messageRef = ref.child('messages');
var usersRef = ref.child('users');
var currentUser = null;

//STEP 2
	$('#login').on("click", function () {
		auth.login('twitter');
	});

//STEP 3
var auth = new FirebaseSimpleLogin(ref, function (error, user) {
	if (error) {
		console.log(error);
	}
	else if (user) {
		// console.log(user);
		usersRef.child(user.uid).set({pic: user.thirdPartyUserData.profile_image_url, username: user.username});
		currentUser = user;
	} else {
	}
});

//STEP 4
	usersRef.on("child_added", function (snapshot) {
		var user = snapshot.val();
		$("<div id='user'><img src=" + user.pic + "/><span id='username'>@" + user.username + "</span></div>").appendTo($('#here'));

	});

//STEP 5
	$('#tweet-submit').on('click', function () {
		if (currentUser !== null) {
			//Pull message value
			var message = $('#msgInput').val();

			//Send the message to Firebase
			messageRef.push({message: message, username: currentUser.username, user: currentUser.uid});

			//Reset text input
			$('#msgInput').val('');
		} else {
			alert('You must login with Twitter to post!');
		}
	});



//STEP 6
	messagesRef.on("child_added", function (snapshot) {
		var message = snapshot.val();
		$('#stream').append($("<div class='msg-text'>").text(message.username).append('<br/>').append($('<span/>').text(message.message)));
	});