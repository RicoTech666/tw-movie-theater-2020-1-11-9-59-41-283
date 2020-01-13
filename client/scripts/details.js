const BASIC_URL = "http://127.0.0.1:8888/";
const movieId = "26942674";
function _$(className) {
	return document.getElementsByClassName(className);
}

ajax({
	url: BASIC_URL + "/v2/movie/subject/" + movieId + "?apikey=0df993c66c0c636e29ecbb5344252a4a",
	method: "GET",
	success: function(response) {
		console.log(response);
		renderMovieDetailedInfo(response);
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
