class DkSnackbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .snackbar_container {
          display: none;
          justify-content: center;
          flex-direction: column;
          position: fixed;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 320px;
          padding: 12px 16px;
          margin-bottom: 40px;
          z-index: 9999;
        }

        .snackbar_container.show {
          display: flex;
        }

        .snackbar {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          background: #0c0c0c;
          border-radius: 8px;
          margin-bottom: 8px;
          padding: 16px;
          direction: rtl;
        }

        .message {
          font-size: 12px;
          font-weight: 400;
          line-height: 2.15;
          color: #fff;
          margin-left: 20px;
        }

        button {
          font-family: "IRANYekan";
          font-size: 12px;
          font-weight: 400;
          line-height: 2.15;
          color: #1672dd;
          margin-right: auto;
          background: rgba(0,0,0,0);
          border: none;
          cursor: pointer;
        }
      </style>

      <div class="snackbar_container">
        <div class="snackbar">
          <span class="message"></span>
          <button>باشه</button>
        </div>
      </div>
    `;

    this.container = this.shadowRoot.querySelector(".snackbar_container");
    this.message = this.shadowRoot.querySelector(".message");
    this.button = this.shadowRoot.querySelector("button");

    this.button.addEventListener("click", () => {
      this.hide();
    });
  }

  show(text, duration = 3000) {
    this.message.textContent = text;

    this.container.classList.add("show");

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.container.classList.remove("show");
  }
}

if (!customElements.get("dk-snackbar")) {
  customElements.define("dk-snackbar", DkSnackbar);
}
