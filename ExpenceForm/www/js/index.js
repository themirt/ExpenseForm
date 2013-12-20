/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		/*
		 var parentElement = document.getElementById(id);
		 var listeningElement = parentElement.querySelector('.listening');
		 var receivedElement = parentElement.querySelector('.received');

		 setTimeout(function() {
		 listeningElement.setAttribute('style', 'display:none;');
		 receivedElement.setAttribute('style', 'display:block;');

		 console.log('Received Event: ' + id);
		 }, 2000);
		 */
		checkConnection();
		
		app.getProducts();
		$('#products').bind('change', function(e) {
			console.log(e);
			console.warn(e.currentTarget.value);
			
			var ind = e.currentTarget.selectedIndex-1;
			var prod = app.productList[ind];
			console.dir(prod);
			$('#img1').attr('src', prod.ImageUrl);
		});

	},

	productList : null,

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
};
