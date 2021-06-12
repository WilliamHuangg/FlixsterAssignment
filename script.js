//Global Constants
const APIkey = "2774131b9ad6b87d3c5430187b569906";

const searchForm = document.querySelector("form");
// const mainButton = document.querySelector("#mainButton");
const input = document.querySelector("#input");
const bodyArea = document.querySelector("#body-area");

const showMoreCurrent = document.querySelector("#showMoreCurrent")
const showMoreSearch = document.querySelector("#showMoreSearch")
const textDisplay = document.querySelector("#text-display")
const popupContent = document.querySelector(".modal-content")

const clearSearch = document.querySelector("#clearSearch")

//Global Variables
var currentPageNum = 1;
var searchPageNum = 1;


//Shows current popular movies on page load
async function currentMovies(){
    currentResponse = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=" + APIkey + "&language=en-US&page=" + currentPageNum)
    console.log(currentPageNum);
    currentResponseData = await currentResponse.json();
    console.log(currentResponseData)
    displayResults(currentResponseData);
}
currentMovies();

async function handleFormSubmit(event){
    event.preventDefault();
    var searchPageNum = 1;
    console.log("search page number is",searchPageNum)
    textDisplay.innerHTML = `<h1>You Searched: ${input.value}</h1>`
    bodyArea.innerHTML = ``;
    storageInputValue = input.value;
    console.log(storageInputValue)
    getResults(storageInputValue);
    input.value = '';
    document.querySelector("#showMoreSearch").style.display='block';
    document.querySelector("#showMoreCurrent").style.display='none';
}

searchForm.addEventListener("submit",handleFormSubmit)
// mainButton.addEventListener("click",handleFormSubmit)

clearSearch.addEventListener("click",closeSearched)

function closeSearched(){
    textDisplay.innerHTML = `<h1>Now Playing</h1>`;
    bodyArea.innerHTML = ``;
    currentPageNum = 1;
    currentMovies();
    document.querySelector("#showMoreSearch").style.display='none';
    document.querySelector("#showMoreCurrent").style.display='block';
}

// mainButton.addEventListener("click", event => {
//     bodyArea.innerHTML = ``;
//     event.preventDefault();
//     storageInputValue = input.value;
//     console.log(storageInputValue)
//     getResults(storageInputValue);
// })


// https://api.themoviedb.org/3/search/movie?api_key=" + APIkey + "&query=" + value
// +apiKey+"&language=en-US&query="+input+"&page=1&include_adult=false"

async function getResults(value){
    console.log("page num begin:",searchPageNum);
    apiURL = "https://api.themoviedb.org/3/search/movie?api_key=" + APIkey + "&query=" + value + "&page=" + searchPageNum;
    console.log(apiURL);
    const response = await fetch(apiURL);
    console.log(response);
    const responseData = await response.json();
    console.log(responseData);
    displayResults(responseData);
}

function displayResults(responseData){
    responseData.results.forEach(element => {
        bodyArea.innerHTML += `
        <div id="added-div" class="flex-grid">
        <img id="added-img" src="https://image.tmdb.org/t/p/w342/${element.poster_path}" alt="${element.original_title}'s poster image" onclick="displayMovieModal(${element.id})"/>
            <div id="added-text-div" class="added-text-class">
                <h3 id="movie-title">${element.title}</h3>
                <h3 id="vote-rating">⭐${element.vote_average}</h3>
            </div>
        </div>
        `;
    });
}

showMoreCurrent.addEventListener("click",displayMoreCurrent)

function displayMoreCurrent(){
    currentPageNum += 1;
    currentMovies();
}

showMoreSearch.addEventListener("click",displayMoreSearch)

function displayMoreSearch(){
    searchPageNum +=1;
    getResults(storageInputValue);
}


// function displayMoreCurrent(){
//     if (typeof input == 'undefined'){
//         currentMovies();
//     }
//     else if (typeof input !== 'undefined'){
//         getResults();
//     }
// }


// var movieClick = document.querySelector("#added-img")
// movieClick.addEventListener("click",displayMovieModal)

async function displayMovieModal(movieID){
    console.log(movieID,"movie image was clicked");
    popupResponse = await fetch("https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + APIkey + "&language=en-US");
    console.log(popupResponse);
    popupResponseInfo = await popupResponse.json();
    console.log(popupResponseInfo);
    displayPopup(popupResponseInfo);
}

function displayPopup(movie){
    modal.style.display = "block";
    window.onclick = function(event){
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    console.log(movie.genres);

    var movieGenres = []
    movie.genres.forEach(element =>{
        movieGenres.push(element.name )
        console.log(element.name)
    })
    console.log(movieGenres);
    // popupContent.innerHTML = ``
    // <span class="close">&times;</span>        

    popupContent.innerHTML = `
        <div class="popupIMG-container">
        <img class="popupIMG" src="https://image.tmdb.org/t/p/w780/${movie.backdrop_path}" />
        <img class="popupPosterIMG" src="https://image.tmdb.org/t/p/w342/${movie.poster_path}"/>
        </div>
        <div class="spacer">
        </div>
        <div id="popup-text">
        <h1>${movie.title}</h1>
        <p>Run Time: ${movie.runtime} minutes </p>
        <p>Rating:⭐${movie.vote_average}</p>
        <p>Release Date: ${movie.release_date} </p>
        <p>Movie Genre: ${movieGenres} </p>
        <p>Movie Summary: ${movie.overview} </p>
        </div>
    
    `
    span.onclick = function (){
        modal.style.display= "none";
    }
}


// document.getElementById("added-img").onclick = function(){
//     console.log("movie image was clicked")
// }




var modal = document.querySelector("#myModal");
var modalBtn = document.querySelector("#modalBtn");
var span = document.getElementsByClassName("close")[0];

// modalBtn.onclick = function(){
//     modal.style.display = "block";
// }
span.onclick = function (){
    modal.style.display= "none";
}
