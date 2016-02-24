define(function (require) {

	var classmanager = require("../classmanager");

	var sitemap = {};

	var pages = [ 
		{ title : "About", content : require("./about") },
		{ title : "Portfolio", content : require("./portfolio") },
		{ title : "Artworks", content : require("./artworks") },
		{ title : "Resume", content : require("./resume") },
		{ title : "Contact", content : require("./contact") },
	];
	var numOfPages = pages.length;

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = "sitemapStyle";
	style.innerHTML = [
		"#mainNavigationContainer {",
			"width: 100%;",
			"height: 50px;",
			"padding-top: 20px;",
			"text-align: center;",
			"background: url('src/images/navigation background.png') repeat-x;",
			"transition: 0.5s;",
			"-webkit-transition: 0.5s;",
		"}",
		"#mainNavigationContainer.hidden {",
			"opacity: 0;",
		"}",
		"#mainNavigationContainer.unselectable {",
			"-webkit-user-select: none;",
			"-moz-user-select: none;",
			"-ms-user-select: none;",
			"-o-user-select: none;",
			"user-select: none;",
		"}",
		"#contentContainer {",
			"position: absolute;",
			"top: 70px;",
			"bottom: 0px;",
			"width: 100%;",
			"overflow: auto;",
			"color: white;",
		"}",
		"#contentContainer.hidden {",
			"height: 0px;",
		"}",
		"#contentTop {",
			"width: 100%;",
		"}",
		"#mobileNavigationButton {",
			"display: none;",
			"position: absolute;",
			"top: 0px;",
			"left: 0px;",
			"width: 50px;",
			"height: 50px;",
			"background: url('src/images/mobile navigator.png') no-repeat;",
			"background-size: contain;",
			"cursor: pointer;",
			"opacity: 0.8;",
			"transition: 0.5s;",
			"-webkit-transition: 0.5s;",
		"}",
		"#mobileNavigationButton.hidden {",
			"opacity: 0;",
		"}",
		"#mobileNavigationButton:hover {",
			"opacity: 1;",
		"}",
		".contentPage {",
			"position: absolute;",
			"top: 0px;",
			"width: 100%;",
			"transition: 0.8s;",
			"-webkit-transition: 0.8s;",
		"}",
		".contentPage.hidden {",
			"opacity: 0;",
			"overflow: hidden;",
			"height: 0px;",
		"}",
		".navigationItem {",
			"display: inline-block;",
			"padding: 10px 20px;",
			"font: 16px 'Webly Sleek';",
			"text-transform: uppercase;",
			"font-weight: lighter;",
			"letter-spacing: 4px;",
			"color: white;",
			"cursor: pointer;",
			"opacity: 0.6;",
			"transition: 0.5s;",
			"-webkit-transition: 0.5s;",
			"overflow: hidden;",
		"}",
		".navigationItemLine {",
			"position: relative;",
			"height: 2px;",
			"width: 100%;",
			"background: white none repeat scroll 0% 0%;",
			"opacity: 0.6;",
			"left: -100%;",
			"margin-left: -20px;",
			"transition: 0.5s;",
			"-webkit-transition: 0.5s;",
		"}",
		".navigationItemSelected {",
			"color: black;",
			"background: white;",
		"}",
		".navigationItem:hover {",
			"opacity: 1;",
		"}",
		".navigationItem:hover .navigationItemLine {",
			"margin-left: 20px;",
			"left: 100%;",
		"}",
		"@media screen and (max-width: 750px) {",
			"#mainNavigationContainer {",
				"position: absolute;",
				"top: 0px;",
				"left: -160px;",
				"width: 160px;",
				"height: auto;",
				"padding-top: 10px;",
				"padding-bottom: 10px;",
				"background: rgba(0, 0, 0, 0.8);",
				"text-align: left;",
			"}",
			"#mainNavigationContainer.expanded {",
				"left: 50px;",
			"}",
			"#contentContainer {",
				"top: 50px;",
			"}",
			"#mobileNavigationButton {",
				"display: block;",
			"}",
			".navigationItem {",
				"width: 120px;",
			"}",
		"}",
		"@media screen and (max-width: 350px) {",

	 	"}"
	].join(" ");

	var mainNavigationContainer = document.createElement("div");
	mainNavigationContainer.id = "mainNavigationContainer";
	mainNavigationContainer.className = "unselectable";

	var contentContainer = document.createElement("div");
	contentContainer.id = "contentContainer";
	contentContainer.className = "hidden";

	var contentTop = document.createElement("div");
	contentTop.id = "contentTop";
	contentContainer.appendChild(contentTop);

	var previousPage = null;

	var changeToPage = function (page) {

		if (page && page.length > 0) {

			if (sitemap.onContentShow) {
				sitemap.onContentShow();
			}

			classmanager.removeClass(contentContainer, "hidden");

			if (previousPage !== page) {

				if (previousPage !== null) {

					var previousNavigationItem = document.getElementById("navigationItem_" + previousPage);
					var previousContentPage = document.getElementById("contentPage_" + previousPage);

					classmanager.removeClass(previousNavigationItem, "navigationItemSelected");
					classmanager.addClass(previousContentPage, "hidden");
				}

				var navigationItem = document.getElementById("navigationItem_" + page);
				var contentPage = document.getElementById("contentPage_" + page);

				classmanager.addClass(navigationItem, "navigationItemSelected");
				classmanager.removeClass(contentPage, "hidden");

				contentTop.scrollIntoView(true);
			}

			previousPage = page;
		}
		else {

			if (sitemap.onContentHidden) {
				sitemap.onContentHidden();
			}

			classmanager.addClass(contentContainer, "hidden");
		}
	}

	for (var i = 0; i < numOfPages; i++) {

		var page = pages[i].title;
		var page_ = page.replace(" ", "_");
		var pageContent = pages[i].content;
		var pageStyle = pageContent.style;

		var contentPage = document.createElement("div");
		contentPage.id = "contentPage_" + page_;
		contentPage.className = "contentPage hidden";
		contentPage.appendChild(pageContent.content);
		style.innerHTML += " " + pageStyle.innerHTML;

		contentContainer.appendChild(contentPage);

		var navigationItem = document.createElement("div");
		navigationItem.className = "navigationItem";
		navigationItem.id = "navigationItem_" + page_;
		navigationItem.innerHTML = page;
		navigationItem.addEventListener("mousedown", function (event) {
			if (event.which === 1) {
				mainNavigationContainer.style.left = "";
				changeToPage(this.id.replace("navigationItem_", ""));
			}
		}, false);

		var navigationItemLine = document.createElement("div");
		navigationItemLine.className = "navigationItemLine";
		navigationItem.appendChild(navigationItemLine)

		mainNavigationContainer.appendChild(navigationItem);
	}

	var mobileNavigationButton = document.createElement("div");
	mobileNavigationButton.id = "mobileNavigationButton";

	mobileNavigationButton.addEventListener("mousedown", function (event) {
		classmanager.toggleClass(mainNavigationContainer, "expanded");
	}, false);

	sitemap.style = style;
	sitemap.mainNavigationContainer = mainNavigationContainer;
	sitemap.contentContainer = contentContainer;
	sitemap.mobileNavigationButton = mobileNavigationButton;

	sitemap.showNavigation = function () {
		classmanager.removeClass(mainNavigationContainer, "hidden");
		classmanager.removeClass(mobileNavigationButton, "hidden");
	};

	sitemap.hideNavigation = function () {
		if (mainNavigationContainer.className.indexOf(" hidden") === -1) {
			classmanager.addClass(mainNavigationContainer, "hidden");
			classmanager.addClass(mobileNavigationButton, "hidden");
		}
	}

	return sitemap;
});
