let textArea = document.getElementById("hideWebtoonList");

chrome.storage.sync.get("hideWebtoonList", ({ hideWebtoonList = "" }) => {
	textArea.value = hideWebtoonList;
	console.log(hideWebtoonList);
});

function updateHideWebtoonList(e) {
	let hideWebtoonList = e.target.value;
	chrome.storage.sync.set({ hideWebtoonList });
}
textArea.addEventListener("change", updateHideWebtoonList);
