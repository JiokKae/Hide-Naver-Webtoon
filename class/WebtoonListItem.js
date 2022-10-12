class WebtoonListItem extends HTMLElement {
	#webtoonTitle = this.getAttribute("webtoon-title") ?? "";
	#content = html`<div class="item">
		<div class="title" title="${this.#webtoonTitle}">
			${this.#webtoonTitle}
		</div>
		<small>숨김 해제</small>
	</div>`;
	#style = html`<style>
		.item {
			width: 210px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 20px;
			border: 1px solid #aaa;
			padding: 8px;
		}
		.title {
			max-width: 140px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		small {
			white-space: nowrap;
			cursor: pointer;
		}
	</style>`;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.#content.querySelector("small").addEventListener("click", () => {
			this.#askRemoveTitle();
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.append(this.#style, this.#content);
	}

	#askRemoveTitle() {
		if (
			confirm(
				`\"${this.#webtoonTitle}\" 웹툰 숨김을 해제하시겠습니까?`
			) === false
		) {
			return;
		}
		this.#removeTitleFromList();
		location.reload();
	}

	#removeTitleFromList() {
		chrome.storage.sync.get(
			"hideWebtoonList",
			({ hideWebtoonList = "" }) => {
				chrome.storage.sync.set({
					hideWebtoonList: hideWebtoonList.replace(
						this.#webtoonTitle + ";",
						""
					),
				});
			}
		);
	}
}
customElements.define("webtoon-list-item", WebtoonListItem);
