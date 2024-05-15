class DropDownElement extends HTMLElement {
    static template = document.createElement('template');

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                }
                #panel {
                    display: none;
                    position: absolute;
                    background-color: white;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    z-index: 1;
                }
                :host([open]) #panel {
                    display: block;
                }
            </style>
            <slot name="actuator"><button>Menu</button></slot>
            <div id="panel">
                <slot></slot>
            </div>
        `;

        const actuatorSlot = this.shadowRoot.querySelector('slot[name="actuator"]');
        actuatorSlot.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        if (this.hasAttribute('open')) {
            this.removeAttribute('open');
        } else {
            this.setAttribute('open', '');
        }
    }
}

customElements.define('dropdown-element', DropDownElement);
