var titleTag = document.createElement("title");
titleTag.innerHTML = "John. W";

var style = document.createElement("style");
style.type = "text/css";
style.id = "mainStyle";
style.innerHTML = [
	"html, body {",
		"width: 100%;",
		"height: 100%;",
	"}",
	"body {",
		"margin: 0px;",
		"background: black;",
	"}",
	"#mainBackground {",
		"position: absolute;",
		"width: 100%;",
		"height: 100%;",
	"}",
	"#overlay {",
		"position: absolute;",
		"width: 100%;",
		"height: 100%;",
		"background: url('src/images/overlay.png') repeat;",
	"}",
	"#mainContainer {",
		"position: absolute;",
		"width: 100%;",
		"height: 100%;",
	"}",
	"#logo {",
		"position: absolute;",
		"bottom: 20px;",
		"right: 20px;",
		"width: 100px;",
		"height: 100px;",
		"background: url('src/images/JW logo.png') no-repeat;",
		"background-size: contain;",
		"opacity: 0.6;",
	"}",
	
	"@media screen and (max-width: 750px) {",
		"#logo {",
			"bottom: 10px;",
			"right: 10px;",
			"width: 80px;",
			"height: 80px;",
		"}",
	"}",

	"@media screen and (max-width: 350px) {",

	"}",

	"::-webkit-scrollbar {",
		"width: 10px;",
		"height: 10px;",
	"}",
	"::-moz-scrollbar-track {",
		"background-color: rgba(0, 0, 0, 0.6);",
	"}",
	"::-webkit-scrollbar-track {",
		"background-color: rgba(0, 0, 0, 0.6);",
	"}",
	"::-webkit-scrollbar-thumb {",
		"background-color: rgba(125, 125, 125, 0.4);",
		"-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),inset 0 -1px 0 rgba(0, 0, 0, 0.07);",
	"}",
	"::-webkit-scrollbar-corner {",
		"background-color: transparent;",
	"}"
].join(" ");

var head = document.getElementsByTagName("head")[0];
head.appendChild(titleTag);
head.appendChild(style);

var mainBackground = document.createElement("div");
mainBackground.id = "mainBackground";

var overlay = document.createElement("div");
overlay.id = "overlay";

var mainContainer = document.createElement("div");
mainContainer.id = "mainContainer";

var logo = document.createElement("div");
logo.id = "logo";

mainContainer.appendChild(logo);

var body = document.getElementsByTagName("body")[0];
body.appendChild(mainBackground);
body.appendChild(overlay);
body.appendChild(mainContainer);

require(["./fonts", "./headline", "./sitemap/sitemap"], function(fontsStyle, headline, sitemap) {

	var headlineStyle = headline.style;
	var headlineContainer = headline.headlineContainer;

	var sitemapStyle = sitemap.style;
	var contentContainer = sitemap.contentContainer;
	var mainNavigationContainer = sitemap.mainNavigationContainer;
	var mobileNavigationButton = sitemap.mobileNavigationButton;

	sitemap.onContentShow = headline.hideHeadlines;
	sitemap.onContentHidden = headline.showHeadlines;

	head.appendChild(fontsStyle);
	head.appendChild(headlineStyle);
	head.appendChild(sitemapStyle);

	mainContainer.appendChild(headlineContainer);
	mainContainer.appendChild(contentContainer);
	mainContainer.appendChild(mainNavigationContainer);
	mainContainer.appendChild(mobileNavigationButton);

	/**** Initiate show scene ****/
	sitemap.hideNavigation();
	headline.hideHeadlines();
	
	setTimeout(function() {
		sitemap.showNavigation();
		headline.showHeadlines();
	}, 500);
});

require(["fireflies/app"], function(scene) {
	var firefliesScene = new scene(mainBackground);
	firefliesScene.addMouseListener(mainContainer);
	firefliesScene.startScene();
});
