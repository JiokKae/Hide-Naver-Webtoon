function hideWebtoon(name) {
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
	webtoons.forEach((element) => {
		hideWebtoon(element);
	});
});
