// profile-view.js
import { define, Form, Auth, Observer } from "@calpoly/mustang";


export class ProfileViewElement extends HTMLElement {
    static styles = `
        * {
            margin: 0;
            box-sizing: border-box;
        }
        /* Add any additional styles here */
    `;

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

    _authObserver = new Observer(this, "prestoncaldero:auth");
  
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

class ProfileEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });
  @property()
  username?: string;

  @property({ attribute: false })
  init?: Profile;

  render() {
    return html`
    `;
  }

  static styles = [
    resetStyles,
    gridStyles,
    css`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
    `
  ];
}
  
_handleSubmit(event: Form.SubmitEvent<Profile>) {
  console.log("Handling submit of mu-form");
  this.dispatchMessage([
    "profile/save",
    {
      userid: this.userid,
      profile: event.detail,
      onSuccess: () =>
        History.dispatch(this, "history/navigate", {
          href: `/app/profile/${this.userid}`
        }),
      onFailure: (error: Error) =>
        console.log("ERROR:", error)
    }
  ]);
}

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-editor": ProfileEditor,
    …
  });

  render() {
    //
    return this.edit
      ? html`
          <profile-editor
            username=${userid}
            .init=${this.profile}
            @mu-form:submit=${
              (event: Form.SubmitEvent<Profile>) =>
                this._handleSubmit(event)
            }
          >
            ${fields}
          </profile-editor>
        `
      : html`…`; // the non-editing view
  }


customElements.define("profile-view", ProfileViewElement);
