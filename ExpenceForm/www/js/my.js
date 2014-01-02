appCodes = {
	push : {
		//pushWooshAppCode : "83E51-9B80D",
		//androidSenderId : "268470725852"
		pushWooshAppCode : "8929B-D7D16",
		androidSenderId : "449671850278"
	},
	map : {
		//keyForBrowser : 'AIzaSyCA2xVgSRWf11kzDaO-KIA7QUQvGU1odFc'
		keyForBrowser : 'AIzaSyBwH3SfcJdQu0Z-D_JbyfN4FQMt67Lo3V8'
	}
};

function showMessage(msg, title, buttonCaption) {
	var btnCaption = buttonCaption ? buttonCaption : "Tamam";
	navigator.notification.alert(msg, null, title, btnCaption);
}
