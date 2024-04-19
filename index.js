// This function will be used to fetch the data from db.json
async function fetchCharacterData() {
    const response = await fetch('/path/to/db.json'); // You need to provide the correct path
    const data = await response.json();
    return data.characters;
}

// This function will populate the character list and set up event listeners for the gallery
function setupGallery(characters) {
    const characterList = document.getElementById('character-list');
    const imageDisplay = document.getElementById('image-display');

    characters.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;

        // Event listener for when a character name is clicked
        listItem.addEventListener('click', () => {
            const image = document.createElement('img');
            image.src = character.image;
            image.alt = character.name;

            // Clear the display and show the new image
            imageDisplay.innerHTML = '';
            imageDisplay.appendChild(image);
        });

        characterList.appendChild(listItem);
    });
}

// Event listener for when the document has loaded
document.addEventListener('DOMContentLoaded', async () => {
    const characters = await fetchCharacterData();
    setupGallery(characters);
});

// ... Existing event listeners ...

document.addEventListener("DOMContentLoaded", function() {
    const dooBobAction = document.querySelector(".dooBob");

    // Function to handle mouseover event
    function handleMouseOver() {
        console.log("Mouse over the image");
        dooBobAction.style.animation = "shake-horizontal 0.5s ease-in-out infinite";
    }

    // Function to handle mouseout event
    function handleMouseOut() {
        console.log("Mouse out from the image");
        dooBobAction.style.animation = ""; // Clear the animation
        dooBobAction.style.animation = "bounce-vertical 0.5s"; // Apply bounce animation
        setTimeout(function() {
            dooBobAction.style.animation = ""; // Clear the animation after it finishes
        }, 500);
    }

    // Add event listeners
    dooBobAction.addEventListener("mouseover", handleMouseOver);
    dooBobAction.addEventListener("mouseout", handleMouseOut);
});

document.addEventListener('DOMContentLoaded', async function() {
    const commentsContainer = document.getElementById('comments');
    const baseUrl = 'http://localhost:3000/comments';  // Make sure this URL is correct!

    // Function to fetch and render comments
    async function fetchComments() {
        const response = await fetch(baseUrl);
        const comments = await response.json();
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            renderComment(comment);
        });
    }

    function renderComment(comment) {
        const div = document.createElement('div');
        div.classList.add('comment-item');
        div.innerHTML = `
            <strong>${comment.username}</strong>: ${comment.text}
            <button onclick="deleteComment(${comment.id})">Delete</button>
            <span class="heart" onclick="likeComment(${comment.id})">&#x2764;</span>
            <span id="likes-count-${comment.id}">${comment.likes || 0}</span>
        `;
        commentsContainer.appendChild(div);
    }

    // Define global functions to handle delete and like
    window.deleteComment = async function(id) {
        await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
        fetchComments();  // Refresh comments list
    };

    window.likeComment = async function(id) {
        const response = await fetch(`${baseUrl}/${id}`);
        const comment = await response.json();
        const updatedLikes = (comment.likes || 0) + 1;

        await fetch(`${baseUrl}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likes: updatedLikes })
        });
        document.getElementById(`likes-count-${id}`).textContent = updatedLikes;
    };

    // Setup comment posting
    document.getElementById('postComment').addEventListener('click', async function() {
        const username = document.getElementById('username').value;
        const commentText = document.getElementById('comment').value;
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, text: commentText, likes: 0 })
        });
        fetchComments();  // Refresh comments list
        document.getElementById('username').value = '';
        document.getElementById('comment').value = '';
    });

    // Call fetchComments initially to load comments
    fetchComments();

    // Additional functionalities from other parts of your script can be added here
});