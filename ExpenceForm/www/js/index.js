var app = {
	initialize : function() {
		this.bindEvents();
	},

	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},

	receivedEvent : function(id) {
		// uygulamanın başlangıç noktası
		this.initButtons();
	},

	initButtons : function() {
		$('#btn_goMasraf').bind('tap', function() {
			$.mobile.changePage($("#page-masraf"), {
				transition : "fade"
			});
		});
	}
	
	/*
	 getProducts : function() {
	 $.ajax({
	 url : "http://cosmeticamobile.com/Announcements.ashx",
	 dataType : "jsonp",
	 success : function(a, b, c) {
	 app.productList = a;

	 for (var i = 0; i < a.length; i++) {
	 var o = new Option(a[i].Description, a[i].ID);
	 $('#products').append(o);
	 };
	 console.log("succ a", a);
	 },
	 error : function(a, b, c) {
	 console.log("err a", a);
	 console.log("err b", b);
	 console.log("err b", c);
	 }
	 });
	 }
	 */

};
