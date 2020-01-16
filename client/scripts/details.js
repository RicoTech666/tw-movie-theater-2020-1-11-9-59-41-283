const movieId = window.location.search.split("?id=")[1];
const BASIC_URL = "http://127.0.0.1:8888";
let moviesData;

function _$(className) {
	return document.getElementsByClassName(className);
}

function loadMovie() {
	ajax({
		url: BASIC_URL + "/v2/movie/subject/" + movieId + "?apikey=0df993c66c0c636e29ecbb5344252a4a",
		method: "GET",
		success: function(response) {
			renderMovieDetailedInfo(response);
			getSimilarMovies(response);
		},
		fail: function(error) {
			console.log("request fail!");
		}
	});
}

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
			moviesData = response;
			const currentMovie = movieObj;
			renderSimilarMovies(currentMovie, response);
		},
		fail: function(error) {
			console.log("request fail!");
		}
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
 		<a href="./details.html?id=${cur.id}" target="_blank">
		<img src="${cur.images.small}" />
		</a>
		<div class="card-cotent">
		<h4 class = "movie-title">${cur.title} (${cur.year})</h4>
		<div class = "similar-movie-rating"><span>${cur.rating.average}/${cur.rating.max}</span></div>	
		<p>导演: <span class="movie-info"> ${cur.directors.map(cur => cur.name)}<span></p>
    <p>演员: <span class="movie-info"> ${cur.casts.map(cur => cur.name)}<span></p>
		<a href="./details.html?id=${cur.id}" target="_blank">
		<button class="movie-description">查看详情</button>
		</a>
		</div>
		</div>`);
	}, "");
}

function truncateMovieArr(movieArr, cutNum) {
	return movieArr.filter((movie, index) => index < cutNum);
}

function createRenderedMovieContent(movies) {
	return movies.reduce((acc, movie) => {
		return (acc += `<div class ="movie-info-card">
			  <a href="./pages/details.html?id=${movie.id}" target="_blank">
          <img class="movie-img" src=${movie.images.small} alt="movie's image">
        </a>
        <div class="card-cotent">
          <h4 class="movie-title">${movie.title} ${movie.rating.average} (${movie.year})</h4>
          <p>导演: <span class="movie-info"> ${movie.directors.map(movie => movie.name)}<span></p>
          <p>演员: <span class="movie-info"> ${movie.casts.map(movie => movie.name)}<span></p>
          <p>类别: <span class="movie-info">${movie.genres}<span></p>
				  <a href="./pages/details.html?id=${movie.id}" target="_blank">
					  <button class="movie-description">查看详情</button>
				  </a>
        </div>
      </div>`);
	}, "");
}

function searchMovieByKeyWords() {
	const keyWords = _$("nav-search-bar")[0].value;
	const matchedMovies = moviesData.subjects.filter(item => item.title.includes(keyWords));
	if ("" !== keyWords) {
		if (matchedMovies.length > 0) {
			_$("similar-movies-content")[0].innerHTML = createRenderedMovieContent(matchedMovies);
		} else {
			_$("similar-movies-content")[0].innerHTML = "骚奥瑞，没有找到对应的电影信息:D";
		}
		_$("similar-movies-banner")[0].innerHTML = "搜索结果";
	}
}

loadMovie();
