import { LitElement, css, html } from "lit";

export class BlazingHeaderElement extends LitElement {
    
  render() {
    return html`
      <header>
        <nav class="navigationMenu">
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="experiences.html">Experiences</a></li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="publications.html">Publications</a></li>
                <li><a href="companies.html">Companies</a></li>
                <li><a href="education.html">Education</a></li>
                <li><a href="endorsements.html">Endorsements</a></li>
                <li><a href="aboutMe.html">About Me</a></li>
            </ul>
        </nav>
      </header>
    `;
  }

  static styles = css`
  body, h1, h2, h3, p, ul {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 24px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 26.4px; } h3 { font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 15.4px; } p { font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 20px; } blockquote { font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 21px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 30px; } pre { font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 18.5714px;
    font-size: 16px;
    line-height: 1.5;
    color: var(--body-text-color);
    background-color: var(--body-color);
  }
  
  .navigationMenu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--nav-footer);
  }
  
  .navigationMenu ul li {
    float: left;
  }
  
  .navigationMenu ul li a {
    display: block;
    color: var(--header-footer-text-color);
    text-align: center;
    padding: 15px;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .navigationMenu ul li a:hover {
    color: var(--hover-color);
  }
  
  header {
    background-color: var(--header-color);
    color: var(--header-text-color);
    text-align: center;
    padding: 20px 0;
  }
  
  .container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
  }
  
  .one {
    flex: 1;
    padding: 20px;
    border: 1px solid var(--column-border-color);
    display: flex;
    flex-direction: column;
  }
  
  .two {
    flex: 1;
    padding: 20px;
    border: 1px solid var(--column-border-color);
  }
  
  footer {
    background-color: var(--nav-footer);
    color: var(--header-footer-text-color);
    text-align: center;
    padding: 20px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
  
  .footer {
    font-size: 16px;
    font-weight: bold;
  }
  :root {
    --header-color: #d8d8d89d;
    --nav-footer: #0b5cab;
    --header-footer-text-color: #ffffff;
    --body-color: #ffffff;
    --body-text-color: #0b5cab;
    --hover-color: #7badea;
    --column-border-color: #0b5cab;
}

/* these are the dark mode colors*/
body.dark-mode {
    --header-color: #505050;
    --nav-footer: #00366b;
    --header-footer-text-color: #ffffff;
    --body-color: #000000;
    --body-text-color: #ffffff;
    --hover-color: #0073ff;
    --column-border-color: #00366b;
  }
  `;
}