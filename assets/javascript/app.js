$(document).ready(function() {
    var movies = ['funny', 'poking', 'fail', 'cactus', 'pizza', 'ice cream', 'reaction', 'screaming', 'cake', 'happy', 'rain', 'disney', 'emoji', 'minion'];

    //Add buttons for topics array
    function renderButtons() {
        $('#movie-buttons').empty();
        for (i = 0; i < movies.length; i++) {
            $('#movie-buttons').append('<button class="button button4" data-movie="' + movies[i] + '">' + movies[i] + '</button>');
        }
    }

    renderButtons();
    
    //Adding button for movie entered
    $('#add-movie').on('click', function(event) {
        event.preventDefault();
        var movie = $('#movie-input').val().trim();
        if (movie === ""){
            alert("Please type a topic.")
            return;
        }else {
        movies.push(movie);
        form.reset();
        renderButtons();}
        return;
    });

    //Getting gifs from api and onto html
    $(document).on('click', '.button', function() {
        var movie = $(this).attr('data-movie');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + movie + '&api_key=NqboVSH8zAAnvT3rvSVfDCicRHLH4Y7g&limit=10&offset=0&lang=en'

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            var results = response.data;
            // console.log(response)
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $('<div>');
                var title = $('<h6>').text('Title: ' + results[i].title);
                var rating = $('<h6>').text('Rating: ' + results[i].rating);
                var movieImg = $('<img>');
                
                movieImg.attr('src', results[i].images.fixed_height_still.url);
                movieImg.attr('data-still', results[i].images.fixed_height_still.url);
                movieImg.attr('data-animate', results[i].images.fixed_height.url);
                movieImg.attr('data-state', 'still');
                movieImg.attr('class', 'gif');
                movieDiv.append(title);
                movieDiv.append(rating);
                movieDiv.append(movieImg);
                $('#movies').prepend(movieDiv);
            }
        });
    });

    function changeState() {
        var state = $(this).attr('data-state');
        var animateImage = $(this).attr('data-animate');
        var stillImage = $(this).attr('data-still');

        if (state == 'still') {
            $(this).attr('src', animateImage);
            $(this).attr('data-state', 'animate');
        } else if (state == 'animate') {
            $(this).attr('src', stillImage);
            $(this).attr('data-state', 'still');
        }
    }

    $(document).on('click', '.gif', changeState);
});
