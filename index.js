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

document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class "l1-Buttons"
    const buttons = document.querySelectorAll(".l1-Buttons");
    
    // Loop through each button and attach click event listener
    buttons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            console.log("Button clicked");
            const url = button.parentElement.href; // Get the URL from the parent anchor's href attribute
            window.open(url, "_blank"); // Open the URL in a new tab
        });
    });
});