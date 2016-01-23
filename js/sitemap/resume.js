define(function (require) {

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = "resumeStyle";
	style.innerHTML = [

		"@media screen and (max-width: 750px) {",

		"}",
		
		"@media screen and (max-width: 350px) {",

	 	"}"
	].join(" ");

	var content = document.createElement("div");
	content.id = "resumeContent";
	content.innerHTML = "Resume";
	content.style.fontSize = "48px";

	return {
		style : style,
		content : content
	};
});
