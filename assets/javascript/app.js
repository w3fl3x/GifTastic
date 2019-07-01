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



        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=NqboVSH8zAAnvT3rvSVfDCicRHLH4Y7g&limit=10";
        
});