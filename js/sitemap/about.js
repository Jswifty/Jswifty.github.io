define(function (require) {

	var style = document.createElement("style");
	style.type = "text/css";
	style.id = "aboutStyle";
	style.innerHTML = [

		"@media screen and (max-width: 750px) {",

		"}",
		
		"@media screen and (max-width: 350px) {",

	 	"}"
	].join(" ");

	var content = document.createElement("div");
	content.id = "aboutContent";
	content.innerHTML = "About";
	content.style.fontSize = "48px";
	
	return {
		style : style,
		content : content
	};
});
