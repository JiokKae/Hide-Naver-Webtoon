class HideUI extends HTMLElement {
	#webtoonTitle = this.getAttribute("webtoon-title") ?? "";
	#content = html`<div class="ui">
		<img
			class="hide-image"
			src="${chrome.runtime.getURL("images/hide.png")}"
			title="${this.#webtoonTitle} 숨기기" />
	</div>`;
	#style = html`<style>
		.ui {
			z-index: 1000;
			position: absolute;
		}
		.hide-image {
			width: 24px;
			border: 1px solid gray;
			border-radius: 9px;
			background: linear-gradient(312deg, #ebebeb, white);
			opacity: 0.5;
		}
		.hide-image:hover {
			opacity: 1;
		}
	</style>`;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.#content.addEventListener("click", () => {
			if (
				confirm(`\"${this.#webtoonTitle}\" 웹툰을 숨기시겠습니까?`) ===
				false
			) {
				return;
			}
			this.#saveTitleToHide();
			this.parentElement.style.display = "none";
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.append(this.#style, this.#content);
	}

	#saveTitleToHide() {
		chrome.storage.sync.get(
			"hideWebtoonList",
			({ hideWebtoonList = "" }) => {
				chrome.storage.sync.set({
					hideWebtoonList: hideWebtoonList + this.#webtoonTitle + ";",
				});
			}
		);
	}
}
customElements.define("hide-ui", HideUI);
