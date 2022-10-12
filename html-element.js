function html(str, ...keys) {
	var template = document.createElement("template");
	var strAll = str[0];
	for (let i = 1; i < str.length; i++) {
		strAll += keys[i - 1] + str[i];
	}
	template.innerHTML = strAll.trim();
	return template.content.firstChild;
}
