const movieId = window.location.search.split("?id=")[1];
const BASIC_URL = "http://127.0.0.1:8888";

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
			renderSimilarMovies(currentMovie, response);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}

function renderSimilarMovies(currentMovie, response) {
	const currentMovieGenres = currentMovie.genres.toString();
	const currentMovieId = currentMovie.id;
	let similarMovies = response.subjects.filter(
		elem =>
			(elem.genres.toString().includes(currentMovieGenres) || currentMovieGenres.includes(elem.genres.toString())) &&
			elem.id !== currentMovieId
	);
	let truncatedMovies = truncateMovieArr(similarMovies, 10);
	_$("similar-movies-content")[0].innerHTML = truncatedMovies.reduce((acc, cur) => {
		return (acc += `<div class="similar-movie-cell">
		<div class="similar-movie-poster">
 		<a href="./details.html?id=${cur.id}" target="_blank">
		<img src="${cur.images.small}" />
		</a>
		</div>
		<div class = "similar-movie-title">${cur.title}</div>
		<div class = "similar-movie-rating"><span>${cur.rating.average}/${cur.rating.max}</span></div>	
		</div>`);
	}, "");
}

function truncateMovieArr(movieArr, cutNum) {
	return movieArr.filter((movie, index) => index < cutNum);
}
