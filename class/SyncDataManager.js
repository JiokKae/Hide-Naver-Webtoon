class SyncDataManager {
	static addHideWebtoon(title) {
		chrome.storage.sync.get(
			"hideWebtoonList",
			({ hideWebtoonList = "" }) => {
				chrome.storage.sync.set({
					hideWebtoonList: hideWebtoonList + title + ";",
				});
			}
		);
	}

	static removeHideWebtoon(title) {
		chrome.storage.sync.get(
			"hideWebtoonList",
			({ hideWebtoonList = "" }) => {
				if (hideWebtoonList === "") {
					return;
				}
				chrome.storage.sync.set({
					hideWebtoonList: hideWebtoonList.replace(title + ";", ""),
				});
			}
		);
	}

	static addFavoritesWebtoon(title) {
		chrome.storage.sync.get(
			"favoritesWebtoons",
			({ favoritesWebtoons = "" }) => {
				chrome.storage.sync.set({
					favoritesWebtoons: favoritesWebtoons + title + ";",
				});
			}
		);
	}

	static removeFavoritesWebtoon(title) {
		chrome.storage.sync.get(
			"favoritesWebtoons",
			({ favoritesWebtoons = "" }) => {
				if (favoritesWebtoons === "") {
					return;
				}
				chrome.storage.sync.set({
					favoritesWebtoons: favoritesWebtoons.replace(
						title + ";",
						""
					),
				});
			}
		);
	}
}
