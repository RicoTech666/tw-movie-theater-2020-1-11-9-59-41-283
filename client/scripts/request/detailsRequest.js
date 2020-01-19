function loadMovie() {
	ajax({
		url: BASIC_URL + "/v2/movie/subject/" + movieId + "?apikey=0df993c66c0c636e29ecbb5344252a4a",
		method: "GET",
		success: function(response) {
			getComments(movieId);
			renderMovieDetailedInfo(response);
			getSimilarMovies(response);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}

function getComments(movieId) {
	ajax({
		url:
			BASIC_URL +
			"/v2/movie/subject/" +
			movieId +
			"/comments" +
			"?start=1&count=5&apikey=0df993c66c0c636e29ecbb5344252a4a",
		method: "GET",
		success: function(response) {
			renderComments(response);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}

function getSimilarMovies(movieObj) {
	ajax({
		url:
			BASIC_URL + "/v2/movie/in_theaters" + "?apikey=0df993c66c0c636e29ecbb5344252a4a" + "&city=北京&start=0&count=100",
		method: "GET",
		success: function(response) {
			moviesData = response;
			const currentMovie = movieObj;
			renderSimilarMovies(currentMovie, response);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}
