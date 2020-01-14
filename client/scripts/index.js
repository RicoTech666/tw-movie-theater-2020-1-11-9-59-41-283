let BASIC_URL = "http://127.0.0.1:8888";
//let movieId = "26942674";

function loadAllData() {
	ajax({
		url:
			BASIC_URL +
			"/v2/movie/in_theaters" +
			"?apikey=0df993c66c0c636e29ecbb5344252a4a" +
			"&start=0&count=250",
		method: "GET",
		success: function(res) {
			getMoviesGenres(res);
			getAllMovies(res);
		}
	});
}

function getMoviesGenres(movies) {
	let movieGenres = new Set(movies.subjects.map(movie => movie.genres).flat());

	addMoviesGenres([...movieGenres]);
}

function addMoviesGenres(genres) {
	let genersList = document.getElementsByClassName("genres-name")[0];
	genres.forEach(genre => {
		genersList.innerHTML += `<li class="movie-genres">${genre}</li>`;
	});
}

function getAllMovies(movies) {
	let moviesInfo = movies.subjects;
	showMovieInfo(moviesInfo);
}

function showMovieInfo(movies) {
	let moviesList = document.getElementsByClassName("movie-list")[0];
	movies.forEach(movie => {
		if (movie) {
			moviesList.innerHTML += `<div class="movie-info-card">
			  <a href="./pages/details.html?id=${movie.id}" target="_blank">
          <img class="movie-img" src=${movie.images.small} alt="movie's image">
        </a>
        <div class="card-cotent">
          <h4 class="movie-title">${movie.title}</h4>
          <p class="movie-info">年份: ${movie.year}</p>
          <p class="movie-info">评分: ${movie.rating.average}</p>
          <p class="movie-info">导演: ${movie.directors.map(
						movie => movie.name
					)}</p>
          <p class="movie-info">演员: ${movie.casts.map(
						movie => movie.name
					)}</p>
          <p class="movie-info">类别: ${movie.genres}</p>
				  <a href="./pages/details.html?id=${movie.id}" target="_blank">
					  <button class="movie-description">查看详情</button>
				  </a>
        </div>
      </div>`;
		}
	});
}

loadAllData();
