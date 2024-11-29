$(document).ready(function () {
    // Triggering the chatbot's response on button click
    $("#send-btn").click(function () {
        const userInput = $("#user-input").val().trim(); // Get input value
        if (userInput === "") {
            alert("Please enter a query."); // Handle empty input
            return;
        }

        // Append user input to chat output
        $("#chat-output").append(`<div class="user-msg"><b>You:</b> ${userInput}</div>`);

        // Send user input to the backend
        $.ajax({
            url: "/get_book_info", // Ensure this endpoint exists and accepts POST requests
            method: "POST", // HTTP method
            contentType: "application/json", // Content type
            data: JSON.stringify({ query: userInput }), // Send data as JSON
            success: function (response) {
                console.log("Response:", response);
                // Display chatbot's response
                if (response && response.response) {
                    $("#chat-output").append(`<div class="bot-msg"><b>Bot:</b> ${response.response}</div>`);
                } else {
                    $("#chat-output").append(`<div class="bot-msg"><b>Bot:</b> No response received.</div>`);
                }
                $("#chat-output").scrollTop($("#chat-output")[0].scrollHeight); // Auto-scroll
            },
            error: function (xhr, status, error) {
                // Handle errors with more details
                console.error("Error:", error);
                console.error("Status:", status);
                console.error("XHR:", xhr);
                $("#chat-output").append(
                    `<div class="bot-msg"><b>Bot:</b> Sorry, something went wrong. Please try again later.</div>`
                );
            },
        });

        // Clear input field after sending
        $("#user-input").val("");
    });

    // Trigger button click on Enter key press
    $("#user-input").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#send-btn").click();
        }
    });
});
function showTabContent(index) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((content) => content.classList.remove('active'));

    // Deactivate all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button) => button.classList.remove('active'));

    // Show the clicked tab content and activate the button
    tabContents[index].classList.add('active');
    tabButtons[index].classList.add('active');
}
