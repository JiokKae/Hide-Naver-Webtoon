class FavoritesUI extends HTMLElement {
	#webtoonTitle = this.getAttribute("webtoon-title") ?? "";
	#content = html`<div
		class="ui ${this.hasAttribute("checked") ? "checked" : ""}"></div>`;

	#listItem = this.parentElement.parentElement;
	#list = this.#listItem.parentElement;

	#style = html`<style>
		.ui {
			position: absolute;
			left: 170px;
			top: 70px;
			background-image: url(${chrome.runtime.getURL("images/stars.png")});
			background-size: 32px 16px;
			width: 16px;
			height: 16px;
		}
		.checked {
			background-position-x: 16px;
		}
		.ui:hover {
			transform: scale(1.3);
		}
	</style>`;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.#content.addEventListener("click", this.#onClick);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.append(this.#style, this.#content);
	}

	#onClick = (e) => {
		e.target.classList.toggle("checked");
		if (e.target.classList.contains("checked")) {
			SyncDataManager.addFavoritesWebtoon(this.#webtoonTitle);
			this.#list.prepend(this.#listItem);
			return;
		}
		SyncDataManager.removeFavoritesWebtoon(this.#webtoonTitle);
	};
}
customElements.define("favorites-ui", FavoritesUI);
