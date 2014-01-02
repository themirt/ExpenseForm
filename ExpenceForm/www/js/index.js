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
		$.support.cors = true;

		this.setPushNotifications();

		this.bindPageShowEvents();
		this.initButtons();
	},

	bindPageShowEvents : function() {
		var self = this;
		$('#page-masraf').bind("pageshow", function() {
			self.fillCustomerList();
		});
	},

	fillCustomerList : function() {
		$.ajax({
			url : "http://localhost:49646/api/Customers",
			dataType : "jsonp",
			success : function(a, b, c) {
				console.log("succ a", a);
			},
			error : function(a, b, c) {
				console.log("err a", a);
				console.log("err b", b);
				console.log("err b", c);
			}
		});
		/*
		 $.getJSON("http://localhost:49646/api/Customers", function(data) {
		 console.debug(data);
		 });
		 */
	},

	initButtons : function() {
		$('#btn_goMasraf').bind('tap', function() {
			$.mobile.changePage($("#page-masraf"), {
				transition : "fade"
			});
		});

		$('#btn_3').bind('tap', function() {
			$.mobile.changePage($("#page-masraf"), {
				transition : "fade"
			});
		});
	},
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

	setPushNotifications : function() {
		try {
			var pushNotification = window.plugins.pushNotification;

			// TODO: Enter your own GCM Sender ID in the register call for Android
			if (device.platform == 'android' || device.platform == 'Android') {

				pushNotification.register(app.pushSuccessHandler, app.pushErrorHandler, {
					"senderID" : appCodes.push.androidSenderId,
					"ecb" : "app.onNotificationGCM"
				});

			} else {
				pushNotification.register(app.pushTokenHandler, app.pushErrorHandler, {
					"badge" : "true",
					"sound" : "true",
					"alert" : "true",
					"ecb" : "app.onNotificationAPN"
				});

			}
		} catch(e) {
			// probably running on browser
			showMessage(e, "setPushNotifications");
		}
	},

	// for iOS
	pushTokenHandler : function(result) {
		try {
			app.registerPushWooshService(result);
		} catch(e) {
			showMessage(e, "pushTokenHandler");
		}
	},

	// for Android -- result contains any message sent from the plugin call
	pushSuccessHandler : function(result) {
		showMessage(result, "pushSuccessHandler");
	},

	// for both
	pushErrorHandler : function(error) {
		showMessage(error, "pushErrorHandler");
	},

	// for both
	registerPushWooshService : function(regId) {
		PushWoosh.appCode = appCodes.push.pushWooshAppCode;
		PushWoosh.register(regId, function(data) {
			showMessage(data, "registerPushWooshService1");
		}, function(errorRegistration) {
			showMessage(errorRegistration, "registerPushWooshService2");
		});
	},

	// iOS
	onNotificationAPN : function(event) {
		try {

			setTimeout(function() {
				$.mobile.changePage($("#page-notification"), {
					transition : "fade"
				});
			}, 1000);

			if (event.alert) {
				showMessage(event.alert, "Bildirim");
			}

			if (event.badge) {
				//alert("Set badge on  " + pushNotification);
				//alert("event.badge " + event.badge);

				//pushNotification.setApplicationIconBadgeNumber(app.pushSuccessHandler, badges.YeniUrun);
				//pushNotification.setApplicationIconBadgeNumber(badges.YeniUrun);
			}

			if (event.sound) {
				var snd = new Media(event.sound);
				snd.play();
			}
			
			$('#not-info').html(event);
			
		} catch(e) {
			showMessage("Bir istisna oluştu.", "Bildirim");
		}
	},
	// Android
	onNotificationGCM : function(e) {
		try {

			setTimeout(function() {
				$.mobile.changePage($("#page-notification"), {
					transition : "fade"
				});
			}, 1000);

			switch( e.event ) {
				case 'registered':
					if (e.regid.length > 0) {
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						//alert('registration id = ' + e.regid);
						app.registerPushWooshService(e.regid);
					}
					break;

				case 'message':
					// this is the actual push notification. its format depends on the data model
					// of the intermediary push server which must also be reflected in GCMIntentService.java
					showMessage(e.message, "Bildirim");
					break;

				case 'error':
					showMessage('GCM error = ' + e.msg, "Hata");
					break;

				default:
					showMessage('An unknown GCM event has occurred', "Hata");
					break;
			}

			$('#not-info').html(e);
			
		} catch(e) {
			showMessage("Bir istisna oluştu.", "Bildirim");
		}
	}
};
