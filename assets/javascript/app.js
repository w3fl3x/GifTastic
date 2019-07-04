$(document).ready(function () {
    // var movies = ['iron man', 'the incredible hulk', 'thor', 'captain america: the first avenger', 'the avengers', 'guardians of the galaxy', 'ant man', 'black panther', 'avengers endgame'];
    var movies = ['funny', 'reaction', 'poking', 'fail', 'cactus'];

    //Add buttons for topics array
    function renderButtons() {
        $('#movie-buttons').empty();
        for (i = 0; i < movies.length; i++) {
            $('#movie-buttons').append('<button class="button button4" data-movie="' + movies[i] + '">' + movies[i] + '</button>');
        }
    }

    renderButtons();
    
    //Adding button for movie entered
    $('#add-movie').on('click', function () {
        event.preventDefault();
        var movie = $('#movie-input').val().trim();
        movies.push(movie);
        form.reset();
        renderButtons();
        return false;
    });

    //Getting gifs from api and onto html
    $('button').on('click', function () {
        var movie = $(this).attr('data-movie');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + movie + '&api_key=NqboVSH8zAAnvT3rvSVfDCicRHLH4Y7g&limit=10&offset=0&lang=en'

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            var results = response.data;
            $('#movies').empty();
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $('<div>');
                var h6 = $('<h6>').text('Rating: ' + results[i].rating);
                var movieImg = $('<img>');
                
                movieImg.attr('src', results[i].images.original_still.url);
                movieImg.attr('data-still', results[i].images.original_still.url);
                movieImg.attr('data-animate', results[i].images.original.url);
                movieImg.attr('data-state', 'still');
                movieImg.attr('class', 'gif');
                movieDiv.append(h6);
                movieDiv.append(movieImg);
                $('#movies').append(movieDiv);
            }
        });
    });

    function changeState() {
        var state = $(this).attr('data-state');
        var animateImage = $(this).attr('data-animate');
        var stillImage = $(this).attr('data-still');

        if (state === 'still') {
            $(this).attr('src', animateImage);
            $(this).attr('data-state', 'animate');
        } else if (state === 'animate') {
            $(this).attr('src', stillImage);
            $(this).attr('data-state', 'still');
        }
    }

    $(document).on('click', '.gif', changeState);
});