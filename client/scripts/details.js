const BASIC_URL = "http://127.0.0.1:8888";
const movieId = "26942674";
function _$(className) {
	return document.getElementsByClassName(className);
}

ajax({
	url: BASIC_URL + "/v2/movie/subject/" + movieId + "?apikey=0df993c66c0c636e29ecbb5344252a4a",
	method: "GET",
	success: function(response) {
		renderMovieDetailedInfo(response);
		getSimilarMovies(response);
	},
	fail: function(error) {
		console.log("request fail!");
	},
});

function renderMovieDetailedInfo(movieObj) {
	_$("movie-title")[0].innerHTML = `${movieObj.title}(${movieObj.year})`;
	_$("movie-poster")[0].innerHTML = `<img src="${movieObj.images.small}" />`;
	_$("director")[0].innerHTML = movieObj.directors.map(elem => elem.name);
	_$("casts")[0].innerHTML = movieObj.casts.map(elem => elem.name);
	_$("genres")[0].innerHTML = movieObj.genres;
	_$("countries")[0].innerHTML = movieObj.countries;
	_$("pubdate")[0].innerHTML = `${movieObj.mainland_pubdate}(中国大陆)/${movieObj.pubdate}(${movieObj.countries})`;
	_$("durations")[0].innerHTML = movieObj.durations;
	_$("rating")[0].innerHTML = `${movieObj.rating.average}/${movieObj.rating.max}`;
	_$("summary-content")[0].innerHTML = movieObj.summary;
}

function getSimilarMovies(movieObj) {
	ajax({
		url:
			BASIC_URL + "/v2/movie/in_theaters" + "?apikey=0df993c66c0c636e29ecbb5344252a4a" + "&city=北京&start=0&count=100",
		method: "GET",
		success: function(response) {
			const currentMovie = movieObj;
			findSimilarMovies(currentMovie, response);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}

function findSimilarMovies(currentMovie, response) {
	const currentMovieGenres = currentMovie.genres.toString();
	let similarMovies = response.subjects.filter(
		elem => elem.genres.toString().includes(currentMovieGenres) || currentMovieGenres.includes(elem.genres.toString())
	);
	_$("similar-movie-content")[0].innerHTML = similarMovies.reduce((acc, cur) => {
		return (acc += `<div class="similar-movie-cell">
		<div class="similar-movie-poster"><img src="${cur.images.small}" /></div>
		<div class = "similar-movie-title">${cur.title}</div>
		<div class = "similar-movie-rating">${cur.rating.average}/${cur.rating.max}</div>	
		</div>`);
	}, "");
}
