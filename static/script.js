$(document).ready(function() {

    console.log('Ready');

    // Fetch the current date and update it in the DOM
    const date = new Date();
    document.getElementById('date').textContent = date.toLocaleString();

    // Write an event, when Submit button is clicked
    $('#button').click(function() {

        // Get the text value from the textarea using the `val()` method
        const textValue = $('#text').val();

        // Convert it to JS object.
        // Provide a `key` here and in write the same in `app.py` file as well to extract data
        const inputText = {'customer_review': textValue};
        console.log(inputText);

        // AJAX request
        $.ajax({

            // Type of web request
            type: 'POST',

            // Data to be sent in JSON format
            data: JSON.stringify(inputText),

            // Type of response expected is JSON
            dataType: 'json',

            // ContentType
            contentType: 'application/json',

            // If everything is successful, run this function
            success: function(result) {

                // Extract prediction and emoticon URL from result
                const sentiment = result.sentiment;
                const emojiPath = result.emoji_path;

                // Update the DOM elements
                $('#sentiment').text(sentiment);
                $('#emoji').attr('src', emojiPath);

                // Show them
                $('#sentiment').show();
                $('#emoji').show();
            },

            // If any error, run this function
            error: function(result) {

                console.log(result);
            }
        });

        // Clearing the textbox after every button push
        $('#text').val('');
    });
});
