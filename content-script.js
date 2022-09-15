function html(str, ...keys) {
	var template = document.createElement("template");
	var strAll = str[0];
	for (let i = 1; i < str.length; i++) {
		strAll += keys[i - 1] + str[i];
	}
	template.innerHTML = strAll.trim();
	return template.content.firstChild;
}

function appendHideUI() {
	var thumbs = document.querySelectorAll("li > div.thumb > a > img");
	thumbs.forEach((thumb) => {
		thumb.parentElement.parentElement.parentElement.prepend(
			html`<hide-ui
				webtoon-title="${thumb.getAttribute("title")}"
			></hide-ui>`
		);
	});
}

function hideWebtoonElement(name) {
	var thumbs = document.querySelectorAll(
		"li > div.thumb > a > img[title='" + name + "']"
	);
	thumbs.forEach(function (thumb) {
		thumb.parentElement.parentElement.parentElement.style.display = "none";
	});
}

chrome.storage.sync.get("hideWebtoonList", ({ hideWebtoonList }) => {
	const webtoons = hideWebtoonList
		.replaceAll("\n", "")
		.split(";")
		.filter((item) => item);
	webtoons.forEach((webtoonName) => {
		hideWebtoonElement(webtoonName);
	});
	appendHideUI();
});
