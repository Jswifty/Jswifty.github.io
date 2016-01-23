define(function (require) {

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = "contactStyle";
	style.innerHTML = [
		"#contactContent {",
			"width: 90%;",
			"margin: auto;",
		"}",
		"#contactContentTitle {",
			"padding-top: 10px;",
			"font-family: 'Webly Sleek';",
			"font-size: 24px;",
			"letter-spacing: 2px;",
		"}",
		"#contactContent hr {",
			"opacity: 0.5;",
		"}",
		"#contactContent {",
			"font-family: 'Webly Sleek';",		
			"font-size: 14px;",
			"letter-spacing: 2px;",
			"line-height: 26px;",
		"}",
		"#contactContent h4 {",
			"padding-bottom: 10px;",
			"font-family: 'Arcon';",
			"font-size: 18px;",
			"letter-spacing: 2px;",
			"margin-top: 0px;",
		"}",
		"#contactContent span {",
			"display: block;",
			"width: 100%;",
		"}",
		"#contactContent .emailLink {",
			"color: white;",
			"text-decoration: none;",
		"}",
		"#contactContent .emailLink:hover {",
			"color: #7777FF;",
		"}",
		".socialNetworkLink {",
			"display: inline-block;",
			"margin-right: 10px;",
			"color: white;",
			"text-decoration: none;",
			"width: 80px;",
			"height: 80px;",
			"font-size: 28px;",
			"text-align: center;",
			"line-height: 80px;",
			"transition: 0.3s;",
			"-webkit-transition: 0.3s;",
		"}",

		"#contact_twitter:hover {",
			"background: #0083B7;",
		"}",
		"#contact_linkedin:hover {",
			"background: #0076B8;",
		"}",
		"#contact_facebook:hover {",
			"background: #365698;",
		"}",
		"#contact_github:hover {",
			"background: #804483;",
		"}",

		"@media screen and (max-width: 750px) {",

		"}",
			
		"@media screen and (max-width: 350px) {",

		"}"
	].join(" ");

	var content = document.createElement("div");
	content.id = "contactContent";

	var title = document.createElement("div");
	title.id = "contactContentTitle";
	title.innerHTML = " ";

	content.appendChild(title);

	content.appendChild(document.createElement("hr"));

	var name = document.createElement("h4");
	name.innerHTML = "John Wong";
	content.appendChild(name);

	var mobile = document.createElement("span");
	mobile.innerHTML = "+44 771 731 6990";
	content.appendChild(mobile);

	var email = document.createElement("a");
	email.className = " emailLink";
	email.innerHTML = "johnwongwwc@gmail.com";
	email.href = "mailto:johnwongwwc@gmail.com";
	content.appendChild(email);

	var otherContacts = document.createElement("p");

	var twitter = document.createElement("a");
	twitter.id = "contact_twitter";
	twitter.className = " socialNetworkLink";
	twitter.href = "http://www.twitter.com/johnwongwwc";
	var twitterIcon = document.createElement("i");
	twitterIcon.className = " icon-twitter";
	twitter.appendChild(twitterIcon);
	otherContacts.appendChild(twitter);

	var linkedin = document.createElement("a");
	linkedin.id = "contact_linkedin";
	linkedin.className = " socialNetworkLink";
	linkedin.href = "http://uk.linkedin.com/in/johnwongwwc";
	var linkedinIcon = document.createElement("i");
	linkedinIcon.className = " icon-linkedin2";
	linkedin.appendChild(linkedinIcon);
	otherContacts.appendChild(linkedin);

	var facebook = document.createElement("a");
	facebook.id = "contact_facebook";
	facebook.className = " socialNetworkLink";
	facebook.href = "http://www.facebook.com/johnwongwwc";
	var facebookIcon = document.createElement("i");
	facebookIcon.className = " icon-facebook";
	facebook.appendChild(facebookIcon);
	otherContacts.appendChild(facebook);

	var github = document.createElement("a");
	github.id = "contact_github";
	github.className = " socialNetworkLink";
	github.href = "http://www.github.com/Jswifty";
	var githubIcon = document.createElement("i");
	githubIcon.className = " icon-github";
	github.appendChild(githubIcon);
	otherContacts.appendChild(github);

	content.appendChild(otherContacts);

	return {
		style : style,
		content : content
	};
});
