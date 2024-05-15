// profile-form.js

export class ProfileForm extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Define the template for the form
        this.shadowRoot.innerHTML = `
            <template>
                <form autocomplete="off">
                    <slot></slot>
                    <button type="submit">Submit</button>
                </form>
                <style>
                    form {
                        display: grid; /* Define your grid here */
                    }
                </style>
            </template>
        `;
    }

    connectedCallback() {
        // Get the form element from the template
        const template = this.shadowRoot.querySelector('template');
        const form = template.content.querySelector('form');
    
        console.log('Form element:', form);
    
        // Add event listener for form submission
        form.addEventListener('submit', this.handleSubmit.bind(this));
        console.log('Event listener added for form submission');
    
        console.log('Form connected');
    
        // Append the form to the shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    

    handleSubmit(event) {
        console.log('Form submission handler invoked'); // New log statement
        event.preventDefault(); // Prevent default form submission behavior
    
        // Construct a JSON object containing form data
        const formData = {};
        const form = this.shadowRoot.querySelector('form');
        const inputs = form.querySelectorAll('input[name]');
    
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });
    
        console.log('Form data:', formData);
    
        // Make a PUT request to update the profile data
        fetch(this.getAttribute('src'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to update profile data: ${response.status}`);
            }
            return response.json();
        })
        .then(updatedProfile => {
            // Populate form fields with updated profile data
            this.populateForm(updatedProfile);
        })
        .catch(error => {
            console.error('Error updating profile data:', error);
        });
    }
    

    populateForm(profile) {
        // Populate form fields with profile data
        const form = this.shadowRoot.querySelector('form');
        Object.keys(profile).forEach(key => {
            const input = form.querySelector(`input[name="${key}"]`);
            if (input) {
                input.value = profile[key];
            }
        });
    }
}

// Define the custom element
customElements.define('profile-form', ProfileForm);
