$(function () {
    $("button").on("click",function(){
        $.ajax({
            url:"http://localhost:8282/books/"
        }).done(function(response){
            console.log(response.results)
            renderMovies(response.results)
        }).fail(function(err){
            console.log(err)
        })
    })

    function renderMovies(movies){
        movies.forEach(function(movie){
            $("#movies").append($(`<li>${movie.title}</li>`))
        })
    }
})