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
          <p class="movie-info">导演: ${movie.directors.map(movie => movie.name)}</p>
          <p class="movie-info">演员: ${movie.casts.map(movie => movie.name)}</p>
          <p class="movie-info">类别: ${movie.genres}</p>
				  <a href="./pages/details.html?id=${movie.id}" target="_blank">
					  <button class="movie-description">查看详情</button>
				  </a>
        </div>
      </div>`);
	}, "");
}

function searchMovieByKeyWords() {
	const keyWords = _$("nav-search-bar")[0].value;

	const searchList = _$("search-movie-lists")[0];
	const searchBar = _$("nav-search-bar")[0];
	const matchedMovies = moviesData.subjects.filter(item => item.title.includes(keyWords));
	searchList.style.top = searchBar.style.top + searchBar.style.height;
	searchList.style.left = searchBar.style.left + "150px";
	searchList.style.width = searchBar.style.width;
	searchList.style.display = "block";
	if ("" === keyWords) {
		searchList.innerHTML = "";
		return;
	}
	if (matchedMovies.length > 0) {
		let list = showSearchList(matchedMovies);
		searchList.innerHTML = list;
	} else {
		searchList.innerHTML = "骚奥瑞，没有找到对应的电影信息:D";
	}
}

function showSearchList(movies) {
	let list = "";
	movies.forEach(movie => {
		if (movie) {
			list += `<li><a href="./pages/details.html?id=${movie.id}" target="_blank">
			<img src=${movie.images.small} alt="movie's image" width="20%">
			<span>${movie.title} ${movie.rating.average} (${movie.year})</span></a>`;
		}
	});
	return list;
}

loadAllData();
