
function addFragmentFrom(url, container) {
    fetch(url)
        .then((res) => res.text())
        .then((text) => addFragment(text, container))
        .catch((error) => {
            console.error('Error fetching or adding fragment:', error);
        });
}

function addFragment(htmlString, container) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const fragment = Array.from(doc.body.childNodes);
    container.append(...fragment);
}

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (event) => {
            const checked = event.target.checked;
            document.body.classList.toggle('dark-mode', checked);
        });
    } else {
        console.error('Element with ID "darkModeToggle" not found.');
    }
});
