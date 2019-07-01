$(document).ready(function() {
    var topics = ['Walt Disney', 'Hot Wheels', 'Cars', 'Fast'];

    //Creating buttons
    function createButton() {
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++) {
            var newTopics = $('<button>')
            newTopics.addClass('gif');
            newTopics.attr("data-name", topics[i]);
            newTopics.text(topics[i]);
            $('#buttons').append(newTopics);
        }
    }

    //Display gifs
    function showGifs() {
        $('#giphy-image').empty();
        var stuff = $(this).attr('data-name');
        var apiKey = 'NqboVSH8zAAnvT3rvSVfDCicRHLH4Y7g';
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + '&q=' + stuff + '&limit=10&offset=0&lang=en';

        //Ajax linked
        $.ajax({
            url: queryUrl,
            method: 'GET'
        })
            .then(function (response) {
            var results = response.data;

            //loop through each gif
            for (var i = 0; i > results.length; i++) {
                var gifDiv = $('<div class="button button4>');
                var showTopic = $('<img>');
                showTopic.attr('src', results[i].images.fixed_height_still.url);
                showTopic.attr('data-still', results[i].images.fixed_height_still.url);
                showTopic.attr('data-animate', results[i].images.fixed_height.url);
                showTopic.attr('data-state', 'still');
                showTopic.addClass('gifs');
                gifDiv.append(showTopic)

                //set rating
                var rating = results[i].rating;
                var gifRating = $('<p>').text('Rating: ' + rating);
                gifDiv.append(gifRating);

                $('#giphy-image').prepend(gifDiv);
            }
        });
    };

    //Animate gif
    $(document).on('click', '.gif', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

    //Add new button for gif topic
    $('#submitButton').on('click', function() {
        var stuff = $('#userinput').val().trim();
        topics.push(stuff);
        form.reset();
        createButton();
        return false;
    });


    $(document).on('click', '.gif', showGifs);
    createButton()
        
});