// @name Stack Overflow
// @include stackoverflow\.com

(function() {
	var exports = {};

	exports["Navigate: Sign Up"] = {
		action: function(api) {
			api.navigate("http://stackoverflow.com/users/signup");
		}
	};

	exports["Navigate: Log In"] = {
		action: function(api) {
			api.navigate("http://stackoverflow.com/users/signup");
		}
	};

	exports["Navigate: Tour"] = {
		action: function(api) {
			api.navigate("http://stackoverflow.com/tour");
		}
	};

	exports["Navigate: About Us"] = {
		action: function(api) {
			api.click(".js-help-button");
			api.click(".js-help-dialog li:nth-of-type(4) a");
		}
	};

	exports["Navigate: Other StackExchange Sites"] = {
		action: function(api) {
			var sites = ["academia", "bitcoin", "aviation"];
			api.ask("Which StackExchange site?", sites, function(subdomain) {
				api.navigate("http://" + subdomain + ".stackexchange.com");
			});
		}
	};

	exports["Navigate: Edit Profile & Settings"] = {
		action: function(api, session) {
			switch (session.getValue('page')) {
				case 'about-me':
					api.click("#tabs > a:nth-child(3)");
					session.removeValue('page');
					break;
				default:
					api.click(".profile-me");
					session.setValue('page', 'about-me');
					api.waitForPageLoad();
					break;
			}
		},
		showIf: function(api) {
			return api.elementExists(".profile-me");
		}
	};

	exports["Navigate: Top Questions"] = {
		action: function(api, session) {
			var links = document.querySelectorAll('.question-hyperlink');
			var questions = [];
			links.forEach(function(e){
				questions.push(api.option(e.innerText, e.href));
			});
			api.ask('Pick a question:', questions, function(selection) {
				api.navigate(selection.data);
			});
		}
	};

	exports["Open Inbox"] = {
		action: function(api, session) {
			api.click('.js-inbox-button');
		}
	};

	exports["Open Achivements"] = {
		action: function(api, session) {
			api.click('.js-achievements-button');
		}
	};

	exports["See all inbox items"] = {
		action: function(api, session) {
			api.click('.inbox-se-link a');
		},
		showIf: function(api) {
			return api.elementExists('.inbox-se-link');
		}
	};

	return exports;
})();