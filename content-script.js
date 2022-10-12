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

chrome.storage.sync.get("hideWebtoonList", ({ hideWebtoonList = "" }) => {
	const webtoons = hideWebtoonList
		.replaceAll("\n", "")
		.split(";")
		.filter((item) => item);
	webtoons.forEach((webtoonName) => {
		hideWebtoonElement(webtoonName);
	});
	chrome.storage.local.get(
		"options",
		({ options: { hidesHideUI = false } = {} }) => {
			if (hidesHideUI === true) {
				return;
			}
			appendHideUI();
		}
	);
});
