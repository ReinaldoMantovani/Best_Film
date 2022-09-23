
const navBar = document.querySelector("nav"),
  menuBtns = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});

overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
});


const visibleBtnScroll = () => {
  let btnVisible = document.getElementById("visible");
   window.onscroll = function() {
     let csp = window.pageYOFFset;
       if(csp > 20) {
          btnVisible.style.bottom = "-5rem";
       } else {
         btnVisible.style.bottom = "1.3rem";
       }
    }
    let cspt = window.pageYOFFset;
    if(cspt < 20) {
      btnVisible.style.display = "none";
    }
 }


//API 

const API_KEY = "api_key=4e477968b18c62c8aeae651019e5237c";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const search_Url = BASE_URL + '/search/movie?' + API_KEY;

// Function 

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {

    showMovies(data.results);
  })
}

getMovies(API_URL);


function showMovies(data) {
  main.innerHTML = "";
  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = ` 
                
                <img src="${IMG_URL + poster_path}" alt="${title}">
                <div class="movie-info">
                  <h3>${title}</h3>
                  <span class="${getColor(vote_average)}"> ${vote_average}</span>
                </div>
                <div class="know-more">
                    <a href="#" class="know-more-btn">Detalhes</a>
                </div>
                    
               
         `;
    main.appendChild(movieEl);
  })
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'purple';
  } else {
    return 'red';
  }
}

getColor();



const btn = document.querySelector(".btn");

btn.addEventListener('click', (e) => {
  e.preventDefault();

  
  const search = document.querySelector("#search");
  const SearchValue = search.value;


  if (SearchValue) {
    getMovies(search_Url + '&query=' + SearchValue);
    
    main.innerHTML = `
        <h1 class="busca" style="color:red; position:fixed;margin-top:1rem;">Buscando por: ${SearchValue}</h1>`
    ;
    
  } else {
  }
    
  search.value = "";

})
