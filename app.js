console.log("test");

const key_api = 'fa0f4639e15d595ef57abf169016859b';
const url_origin = 'https://api.themoviedb.org/3';
const url_api = url_origin + '/discover/movie?sort_by=popularity.desc&' + key_api;
const image = 'https://image.tmdb.org/t/p/w500';
const searchURL = url_origin + '/search/movie?' + key_api;

var language='es';

const getLanguage=()=>{
   let select= document.getElementById('language');
   var lan = select.options[select.selectedIndex].value;
   language=lan;
   console.log(language);
}


const getMovies = (genre) => {
    fetch(url_origin + '/discover/movie?api_key='+key_api 
    + (genre ? '&with_genres=' + genre : '')+'&language='+ language)
        .then(response => response.json())
        .then(data => hacerAlgoConElApi(data));
}

const getPopularShows = () => {
    fetch(url_origin + '/tv/popular?api_key=' + key_api + '&language='+ language)
        .then(response => response.json())
        .then(data => hacerAlgoConElApi(data,true));
}

const getCategories = () => {
    fetch(url_origin + '/genre/movie/list?api_key=' + key_api + '&language='+ language)
        .then(response => response.json())
        .then(data => fillMovieComboBox(data.genres));
}

const getMovieByCategory = () => {
    let select = document.getElementById('moviesCategory');
    var genre = select.options[select.selectedIndex].value;
    let list = document.getElementById("lista");
    list.innerHTML = '';
    getMovies(genre);
}

const fillMovieComboBox = (genres) => {
    console.log(genres)
    let select = document.getElementById('moviesCategory');
    for (let genre in genres) {
        var opt = document.createElement('option');
        opt.value = genres[genre].id;
        opt.innerHTML = genres[genre].name;
        select.appendChild(opt);
    }
    // var value = select.options[select.selectedIndex].value;
    // console.log(value); // en
}

const hacerAlgoConElApi = (data,isTv) => {
    console.log(data.results)
    let list = document.getElementById(isTv?"lista2":"lista");
    let movieArray = data.results;
    for (let result in movieArray) {
        let movie = movieArray[result];
        list.appendChild(createMovieCard(movie,isTv));
    }
}

const createMovieCard = (movie, isTv) => {
    let div = document.createElement('div')
    let img = document.createElement('img')
    let span = document.createElement('span');
    let spanDate = document.createElement('span');
    spanDate.innerHTML = (isTv ? movie.first_air_date : movie.release_date);
    span.innerHTML = (isTv ? movie.original_name : movie.title) + "<br/>";
    span.classList.add('movie__title');
    div.classList.add('movie__card');
    spanDate.classList.add(isTv?'tvshow_date':'movie_date');
    img.src = image + movie.poster_path;
    img.classList.add('movie__image');
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(spanDate);
    return div
}
getMovies();
getCategories();
getPopularShows();





//   const container = document.querySelector('.container')

//   const colors = ['red', 'blue', 'yellow', 'green', 'orange']

//   for (let i = 0; i < 50; ++i) {
//     const color = colors[i % colors.length]
//     container.appendChild(createMovieCard(color))
//   }


// const createMovieCard = color => {
//     const {title, poster_path, vote_average, overview, id} = movie;
//     const movieEl = document.createElement('div');
//     div.classList.add('movie')
//     div.style.background = color
//     div.innerHTML = original_title
//   movieEl.innerHTML = `showMovies 
//   <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

//  <div class="movie-info">
//      <h3>${title}</h3>
//      <span class="${getColor(vote_average)}">${vote_average}</span>
//  </div>

//  <div class="overview">

//      <h3>Overview</h3>
//      ${overview}
//      <br/> 
//      <button class="know-more" id="${id}">Know More</button
//  </div>

// `
// return div
// }
// document.getElementById("lista").appendChild(movieEl)
// document.getElementById(id).addEventListener('click', () => {
//     console.log(id)
//     openNav(movie)
// }