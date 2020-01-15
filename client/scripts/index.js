let BASIC_URL = "http://127.0.0.1:8888";
//let movieId = "26942674";
let moviesData;

function loadAllData() {
	ajax({
		url: BASIC_URL + "/v2/movie/in_theaters" + "?apikey=0df993c66c0c636e29ecbb5344252a4a" + "&start=0&count=250",
		method: "GET",
		success: function(res) {
			moviesData = res;
			getMoviesGenres(res);
			getAllMovies(res);
		},
	});
}

function getMoviesGenres(movies) {
	let movieGenres = new Set(movies.subjects.map(movie => movie.genres).flat());

	addMoviesGenres([...movieGenres]);
}

function addMoviesGenres(genres) {
	let genersList = document.getElementsByClassName("genres-name")[0];
	genres.forEach(genre => {
		genersList.innerHTML += `<li><button class="movie-genres">${genre}</button></li>`;
	});
}

function getAllMovies(movies) {
	let moviesList = document.getElementsByClassName("movie-list")[0];
	let moviesInfo = movies.subjects;
	let list = showMovieInfo(moviesInfo);
	moviesList.innerHTML = list;
}

function showMovieInfo(movies) {
	let list = "";
	movies.forEach(movie => {
		if (movie) {
			list += `<div class="movie-info-card">
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
      </div>`;
		}
	});
	return list;
}

function searchMovieByKeyWords() {
	const keyWords = document.getElementsByClassName("nav-search-bar")[0].value;
	const searchList = document.getElementsByClassName("search-movie-lists")[0];
	searchList.innerHTML = "";
	const searchBar = document.getElementsByClassName("nav-search-bar")[0];
	const singleMovie = moviesData.subjects.filter(item => {
		if (keyWords !== "") {
			return item.title.includes(keyWords);
		}
	});

	if (singleMovie.length) {
		searchList.style.top = searchBar.style.top + searchBar.style.height;
		searchList.style.left = searchBar.style.left + "150px";
		searchList.style.width = searchBar.style.width;
		searchList.style.display = "block";
		let list = showSearchList(singleMovie);
		searchList.innerHTML = list;
	} else {
		alert("没有找到该电影");
		document.getElementsByClassName("nav-search-bar")[0].value = "";
		searchList.style.display = "none";
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
