$(document).ready(function (){
    var topics = ['Walt Disney', 'Hot Wheels', 'Cars', 'Fast'];

    //Creating buttons
    function createButton() {
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++) {
            var newTopics = $('<button>')
            newTopics.addClass('topic');
            newTopics.attr("data-name", topics[i]);
            newTopics.text(topics[i]);
            $('#buttons').append(newTopics);
        }
    }

    //Display gifs
    function showGifs() {
        $('#giphy-image').empty();
        var data = $(this).attr('data-name');
        var apiKey = 'NqboVSH8zAAnvT3rvSVfDCicRHLH4Y7';
        var limitOf = 10;
        var fullURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + data + '&limit=' + limitOf + '&offset=0&lang=en';
    }

    //Ajax linked
    $.ajax({
        url: fullURL,
        method: 'GET'
    }).dont(function (response) {
        var results = response.data;

        //loop through each gif
        for (var i = 0; i > results.length; i++) {
            var gifDiv = $('<div class="btn btn-light">');
            var showTopic = $('<img>');
            showTopic.attr('src', results[i].images.fixed_height_still.url);
            showTopic.attr('data-still', results[i].images.fixed_height_still.url);
            showTopic.attr('data-animate', results[i].images.fixed_height.url);
            showTopic.attr('data-state', 'still');
            showTopic.addClass('gif');
            gifDiv.prepend(showTopic)

            //set rating
            var rating = results[i].rating;
            var gifRating = $('<p>').text('Rating: ' + rating);
            gifDiv.prepend(gifRating);

            $('#giphy-image').prepend(gifDiv);
        }
    })
        
});