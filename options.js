let webtoonList = document.getElementById("webtoon-list");
chrome.storage.sync.get("hideWebtoonList", ({ hideWebtoonList = "" }) => {
	console.log(hideWebtoonList);
	const webtoonNames = hideWebtoonList
		.replaceAll("\n", "")
		.split(";")
		.filter((item) => item)
		.sort();
	webtoonNames.forEach((webtoonName) => {
		webtoonList.append(
			html`<webtoon-list-item
				webtoon-title="${webtoonName}"
			></webtoon-list-item>`
		);
	});
});


const inputHideHideUI = document.getElementById("inputHideHideUI");
const toonItemSample = document.getElementById("toon-item-sample");

getOption("hidesHideUI", (hidesHideUI) => {
	inputHideHideUI.checked = hidesHideUI;
	hideElement(toonItemSample, hidesHideUI);
});

inputHideHideUI.addEventListener("change", toggleHideUI);

function toggleHideUI({ target: { checked: hidesHideUI } }) {
	inputHideHideUI.disabled = true;
	setOption("hidesHideUI", hidesHideUI, inputHideHideUI);
	hideElement(toonItemSample, hidesHideUI);
	return;
}

function setOption(key, value, inputElement) {
	chrome.storage.local.set({ "options": { [key]: value } }, () => {
		inputElement.disabled = false;
	});
}

function getOption(key, event) {
	chrome.storage.local.get("options", ({ options: { [key]: value } = {} }) => {
		event(value);
	});
}

function hideElement(element, b) {
	element.style.display = b === true ? "none" : "";
}
