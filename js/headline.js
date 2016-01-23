define(function (require) {

	var headlineTitles = ["Front End Developer", "Digital Artist", "Junior Graphic Designer"];
	var numOfHeadlines = headlineTitles.length;

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = "headlineStyle";
	style.innerHTML = [
		"#headlineContainer.unselectable {",
			"-webkit-user-select: none;",
			"-moz-user-select: none;",
			"-ms-user-select: none;",
			"-o-user-select: none;",
			"user-select: none;",
		"}",
		"#headlineWrapper {",
			"position: absolute;",
			"top: 40%;",
			"width: 100%;",
			"transition: 0.5s;",
			"-webkit-transition: 0.5s;",
		"}",
		"#headlineWrapper.hidden {",
			"top: 35%;",
			"opacity: 0;",
		"}",
		".headline {",
			"position: absolute;",
			"width: 100%;",
			"text-align: center;",
			"color: white;",
			"font: 48px 'Dolgan';",
			"text-transform: uppercase;",
			"letter-spacing: 5px;",
			"cursor: default;",
		"}",

		"@media screen and (max-width: 750px) {",
			".headline {",
				"font-size: 36px;",
			"}",
		"}",
		
		"@media screen and (max-width: 350px) {",
			".headline {",
				"font-size: 28px;",
			"}",
	 	"}"
	].join(" ");

	var headlineContainer = document.createElement("div");
	headlineContainer.id = "headlineContainer";
	headlineContainer.className = " unselectable";

	var headlineWrapper = document.createElement("div");
	headlineWrapper.id = "headlineWrapper";

	var headlines = [];

	for (var i = 0; i < numOfHeadlines; i++) {

		var headline = document.createElement("div");
		headline.className = " headline";
		headline.innerHTML = headlineTitles[i];
		
		var headlineKeyframesStyle = "headline" + i + " { ";

		for (var j = 0; j <= numOfHeadlines; j += 0.5) {
			headlineKeyframesStyle += (j * 100 / numOfHeadlines) + "% ";
			headlineKeyframesStyle += "{ opacity: " + (j % numOfHeadlines === i ? 1 : 0) + "; }";
		}

		headlineKeyframesStyle += " } ";

		/* Standard syntax */
		style.innerHTML += "keyframes " + headlineKeyframesStyle;
		/* Opera */
		style.innerHTML += "@-o-keyframes " + headlineKeyframesStyle;
		/* Firefox */
		style.innerHTML += "@-moz-keyframes " + headlineKeyframesStyle;
		/* Chrome, Safari */
		style.innerHTML += "@-webkit-keyframes " + headlineKeyframesStyle;

		headlines[i] = headline;

		headlineWrapper.appendChild(headline);
	}

	headlineContainer.appendChild(headlineWrapper);

	return {
		
		style : style,
		headlineContainer : headlineContainer,

		showHeadlines : function () {
			
			headlineWrapper.className = headlineWrapper.className.replace(" hidden", "");

			for (var i = 1; i < numOfHeadlines; i++) {
					headlines[i].style.opacity = "0";
			}

			setTimeout(function () {
				for (var i = 0; i < numOfHeadlines; i++) {
					headlines[i].style.opacity = "";
					headlines[i].style.animation = "headline" + i + " " + (numOfHeadlines * 5) + "s infinite";
				}
			}, 3000);

		},
		
		hideHeadlines : function () {
			if (headlineWrapper.className.indexOf(" hidden") === -1) {
				
				headlineWrapper.className += " hidden";

				setTimeout(function () {
					for (var i = 0; i < numOfHeadlines; i++) {
						headlines[i].style.animation = "";
					}
				}, 500);
			}
		}
	};
});
