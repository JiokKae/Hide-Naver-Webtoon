function appendHideUI() {
	var thumbs = document.querySelectorAll("li > div.thumb > a > img");
	thumbs.forEach((thumb) => {
		thumb.parentElement.parentElement.parentElement.prepend(
			html`<hide-ui
				webtoon-title="${thumb.getAttribute("title")}"></hide-ui>`
		);
	});
}

function appendFavoritesUI(favorites) {
	var imgs = Array.from(
		document.querySelectorAll("ul.img_list > li > div.thumb > a > img")
	).reverse();

	imgs.forEach((img) => {
		var title = img.getAttribute("title");
		var isFavorite = favorites.includes(title);
		var thumb = img.parentElement.parentElement;
		thumb.prepend(
			html`<favorites-ui
				webtoon-title="${title}"
				${isFavorite ? "checked" : ""}></favorites-ui>`
		);
		if (isFavorite) {
			var listItem = thumb.parentElement;
			listItem.parentElement.prepend(listItem);
		}
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

function parseListString(string) {
	return string
		.replaceAll("\n", "")
		.split(";")
		.filter((item) => item);
}

chrome.storage.sync.get(
	["hideWebtoonList", "favoritesWebtoons"],
	({ hideWebtoonList = "", favoritesWebtoons = "" }) => {
		parseListString(hideWebtoonList).forEach((title) =>
			hideWebtoonElement(title)
		);

		chrome.storage.local.get(
			"options",
			({ options: { hidesHideUI = false } = {} }) => {
				if (hidesHideUI === true) {
					return;
				}
				appendHideUI();
			}
		);
		appendFavoritesUI(parseListString(favoritesWebtoons));
	}
);
