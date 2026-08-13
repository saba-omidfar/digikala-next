"use client";

if (typeof window !== "undefined") {
  class DKPopover extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: absolute;
            z-index: 9999;
          }

          .popover {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            display: none;
          }

          :host([open="true"]) .popover {
            display: block;
          }
        </style>

        <div class="popover">
          <slot></slot>
        </div>
      `;
    }
  }

  if (!customElements.get("dk-popover")) {
    customElements.define("dk-popover", DKPopover);
  }
}
