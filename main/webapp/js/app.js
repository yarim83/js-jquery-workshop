$(function () {
    //$("button").on("click",function(){
        $.ajax({
            url:"https://swapi.co/api/films",
        }).done(function(response){
            console.log(response.results)
            renderMovies(response.results)
        }).fail(function(err){
            console.log(err)
        })
    //})

    function renderMovies(movies){
        movies.forEach(function(movie){
            $("#movies").append($(`<li>${movie.title}</li>`))
        })
    }
})