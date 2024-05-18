// profile-view.js
import { Auth, Observer } from "@calpoly/mustang";

export class ProfileViewElement extends HTMLElement {
    static styles = `
        * {
            margin: 0;
            box-sizing: border-box;
        }
        /* Add any additional styles here */
    `;
    _authObserver = new Observer(this, "blazing:auth");

    static template = `
        <template>
            <section>
                <slot name="avatar"></slot>
                <h1><slot name="name"></slot></h1>
                <dl>
                    <dt>Username</dt>
                    <dd><slot name="userid"></slot></dd>
                    <!-- Add slots for other profile data -->
                </dl>
            </section>
            <style>${ProfileViewElement.styles}</style>
        </template>
    `;
  
    constructor() {
        super();
  
        this.attachShadow({ mode: "open" }).innerHTML = ProfileViewElement.template;
    }
  
    get src() {
        return this.getAttribute("src");
    }
  
    connectedCallback() {
        this._authObserver.observe(({ user }) => {
          this._user = user;
      
          if (this.src) {
            loadJSON(this.src, this, renderSlots, this.authorization );
          }
        });
      }

      get authorization() {
        console.log("Authorization for user, ", this._user);
        return (
          this._user?.authenticated && {
            Authorization: `Bearer ${this._user.token}`
          }
        );
      }
    
  
    renderSlots(json) {
        const entries = Object.entries(json);
        const slot = ([key, value]) => {
            // Handle different data types here
            // For now, just create span elements with slot attributes
            return `<span slot="${key}">${value}</span>`;
        };
  
        const slotsHTML = entries.map(slot).join("\n");
        this.shadowRoot.innerHTML += slotsHTML;
    }
}
  
customElements.define("profile-view", ProfileViewElement);
