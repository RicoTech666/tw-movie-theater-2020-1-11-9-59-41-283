let BASIC_URL = "http://127.0.0.1:8888";
let movieId = "26942674";

function loadAllData() {
	ajax({
		url:
			BASIC_URL +
			"/v2/movie/top250" +
			"?apikey=0df993c66c0c636e29ecbb5344252a4a" +
			"&start=0&count=250",
		method: "GET",
		success: function(res) {
			getMoviesGenres(res);
			//addAllData(res);
		}
	});
}

function getMoviesGenres(movies) {
	let genres = [];
	let movieGenres = [];
	movies.subjects.forEach(item => {
		genres.push(item.genres);
	});
	genres.forEach(item => {
		item.forEach(genre => {
			if (movieGenres.indexOf(genre) === -1) {
				movieGenres.push(genre);
			}
		});
	});
	addMoviesGenres(movieGenres);
}

function addMoviesGenres(genres) {
	let genersList = document.getElementsByClassName("genres-name")[0];
	genres.forEach(genre => {
		genersList.innerHTML += `<li class="movie-genres">${genre}</li>`;
	})
}

loadAllData();
