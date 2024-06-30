// Selecting elements from the DOM
const addBookmark = document.querySelector('.add-bookmark'); // Get the element with class 'add-bookmark'
const bookmarkModal = document.querySelector('.bookmark-modal'); // Get the element with class 'bookmark-modal'
const hideModal = document.querySelector('.modal'); // Get the element with class 'modal'
const form = document.querySelector('form'); // Get the first form element in the document
const bookmarkContainer = document.querySelector('.bookmark-container'); // Get the element with class 'bookmark-container'

// Initialize an empty array to store bookmark data
let bookmarkData = [];

// Function to save bookmark data
function saveData(e) {
    e.preventDefault(); // Prevent form submission
    const bookmark = {
        websiteName: e.target[0].value, // Get the value of the first input field (website name)
        websiteUrl: e.target[1].value, // Get the value of the second input field (website URL)
    };
    console.log('Saved bookmark:', bookmark); // Log the saved bookmark data
    bookmarkData.push(bookmark); // Add the bookmark to the array
    localStorage.setItem('Bookmark', JSON.stringify(bookmarkData)); // Store the bookmark data in local storage
    form.reset(); // Reset the form
    e.target[0].focus(); // Set focus back to the first input field
}

// Function to create bookmarks from stored data
function createBookmark() {
    bookmarkContainer.textContent = ''; // Clear existing content in the bookmark container
    if (localStorage.getItem('Bookmark')) {
        bookmarkData = JSON.parse(localStorage.getItem('Bookmark')); // Retrieve bookmark data from local storage
        bookmarkData.forEach(function (eachData, i) {
            const websiteName = eachData.websiteName; // Get the website name
            const websiteUrl = eachData.websiteUrl; // Get the website URL
            const item = document.createElement('div'); // Create a new div element
            item.setAttribute('class', 'bookmark-item'); // Set its class to 'bookmark-item'

            const iTag = document.createElement('i'); // Create an <i> element
            iTag.setAttribute('class', 'fa-solid fa-xmark modal'); // Set its class for styling

            const imgTag = document.createElement('img'); // Create an <img> element
            imgTag.setAttribute('src', 'favicon.png'); // Set the image source (favicon)

            const anchorTag = document.createElement('a'); // Create an <a> element
            anchorTag.setAttribute('href', websiteUrl); // Set the link URL
            anchorTag.textContent = websiteName; // Set the link text

            item.append(iTag, imgTag, anchorTag); // Append elements to the item
            bookmarkContainer.append(item); // Append the item to the bookmark container
        });
    }
}

// Function to handle single bookmark submission
function singleBookmark(e) {
    e.preventDefault(); // Prevent form submission
    const websiteName = e.target[0].value; // Get the value of the first input field (website name)
    const websiteUrl = e.target[1].value; // Get the value of the second input field (website URL)
    console.log('Single bookmark:', websiteName, websiteUrl); // Log the single bookmark data
    const item = document.createElement('div'); // Create a new div element
    item.setAttribute('class', 'bookmark-item'); // Set its class to 'bookmark-item'

    const iTag = document.createElement('i'); // Create an <i> element
    iTag.setAttribute('class', 'fa-solid fa-xmark modal'); // Set its class for styling

    const imgTag = document.createElement('img'); // Create an <img> element
    imgTag.setAttribute('src', 'favicon.png'); // Set the image source (favicon)

    const anchorTag = document.createElement('a'); // Create an <a> element
    anchorTag.setAttribute('href', websiteUrl); // Set the link URL
    anchorTag.textContent = websiteName; // Set the link text

    item.append(iTag, imgTag, anchorTag); // Append elements to the item
    bookmarkContainer.append(item); // Append the item to the bookmark container
}

// Function to delete a bookmark
function delBookmark(e) {
    if (e.target.className === 'fa-solid fa-xmark modal') {
        const bookmarkItem = document.querySelector('.bookmark-item'); // Get the bookmark item
        bookmarkContainer.removeChild(bookmarkItem); // Remove the bookmark item from the container
        bookmarkData.forEach(function (eachData, i) {
            if (eachData.websiteName === e.target.parentElement.children[2].textContent) {
                bookmarkData.splice(i, 1); // Remove the corresponding data from the array
            }
        });
        localStorage.setItem('Bookmark', JSON.stringify(bookmarkData)); // Update local storage
        createBookmark(); // Refresh the displayed bookmarks
    }
}
// Event listeners
form.addEventListener('submit', function (e) {
    singleBookmark(e);
    saveData(e);
});

addBookmark.addEventListener('click', function () {
    bookmarkModal.classList.remove('hide-modal');
});

hideModal.addEventListener('click', function () {
    bookmarkModal.classList.add('hide-modal');
});

window.addEventListener('click', function (e) {
    if (e.target.className === 'bookmark-modal') {
        bookmarkModal.classList.add('hide-modal');
    }
});

bookmarkContainer.addEventListener('click', function (e) {
    delBookmark(e);
});

// Initial call to populate bookmarks
createBookmark();