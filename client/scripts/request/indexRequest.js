function loadAllData() {
	ajax({
		url: BASIC_URL + "/v2/movie/in_theaters" + "?apikey=0df993c66c0c636e29ecbb5344252a4a" + "&start=0&count=250",
		method: "GET",
		success: function(res) {
			moviesData = res;
			getMoviesGenres(res);
			renderAllMovies(res);
		},
	});
}
