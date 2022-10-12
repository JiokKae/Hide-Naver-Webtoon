class WebtoonListInserter extends HTMLElement {
	#content = html`<form>
		<div class="item">
			<input type="text"></input>
			<button>
				숨기기
				<img
					class="hide-image"
					src="${chrome.runtime.getURL("images/hide.png")}"
				/>
			</button>
		</div>
	</form>`;
	#style = html`<style>
		.item {
			display: flex;
			align-items: center;
			border: 1px solid #aaa;
			margin-bottom: 10px;
		}
		input {
			border: 0;
			font-size: large;
		}
		button {
			display: flex;
			padding: 10px;
			border-width: 0;
			border-left: 1px solid #aaa;
			align-items: flex-end;
			cursor: pointer;
			background-color: #eee;
		}
		button:hover {
			background-color: #d0d0d0;
		}
		button:active {
			background-color: #ddd;
		}
		.hide-image {
			width: 16px;
			margin-left: 4px;
		}
	</style>`;

	constructor() {
		super();
		this.style.display = "flex";
		this.attachShadow({ mode: "open" });
		this.#content.addEventListener("submit", (event) => {
			var value = this.#content.querySelector("input").value.trim();
			if (value.length === 0) {
				event.preventDefault();
				return;
			}
			this.#insertTitleToList(value);
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.append(this.#style, this.#content);
	}

	#insertTitleToList(webtoonTitle) {
		chrome.storage.sync.get(
			"hideWebtoonList",
			({ hideWebtoonList = "" }) => {
				chrome.storage.sync.set({
					hideWebtoonList: hideWebtoonList + webtoonTitle + ";",
				});
			}
		);
	}
}
customElements.define("webtoon-list-inserter", WebtoonListInserter);
