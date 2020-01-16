let BASIC_URL = "http://127.0.0.1:8888";
let moviesData;

function _$(className) {
	return document.getElementsByClassName(className);
}

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

function getMoviesGenres(movies) {
	let movieGenres = new Set(movies.subjects.map(movie => movie.genres).flat());
	renderMoviesGenres([...movieGenres]);
}

function renderMoviesGenres(genres) {
	_$("genres-name")[0].innerHTML = genres.reduce((acc, cur) => {
		return (acc += `<li><button class="movie-genres" onclick="displayByGenres()">${cur}</button></li>`);
	}, "");
}

function displayByGenres() {
	const selectedGenre = event.target.innerHTML;
	let selectedMovies = moviesData.subjects.filter(elem => elem.genres.toString().includes(selectedGenre));
	_$("movie-list")[0].innerHTML = createRenderedMovieContent(selectedMovies);
}

function renderAllMovies(movies) {
	_$("movie-list")[0].innerHTML = createRenderedMovieContent(movies.subjects);
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
			_$("movie-list")[0].innerHTML = createRenderedMovieContent(matchedMovies);
		} else {
			_$("movie-list")[0].innerHTML = "骚奥瑞，没有找到对应的电影信息:D";
		}
	}
}

loadAllData();
