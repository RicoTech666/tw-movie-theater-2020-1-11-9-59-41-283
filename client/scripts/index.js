let BASIC_URL = "http://127.0.0.1:8888";
let movieId = "26942674";

function loadAllData() {
	ajax({
		url: BASIC_URL + "/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a",
		method: "GET",
		success: function(res) {
      console.log(res);
      getMoviesgenres(res);
			//addAllData(res);
		}
	});
}

function getMoviesgenres(movies) {
  movies.subjects.forEach(item => {
		let genres = item.genres;
		console.log(genres);
	});
}

loadAllData();
