const parentElement = document.querySelector(".main")
const searchInput = document.querySelector(".input");
const movieRating = document.querySelector("#rating-select");
const movieGenre = document.querySelector("#genre-select");

let searchValue = "";
let ratings = 0;
let genre="";

const URL = "https://a6454cc2-ef59-4e6c-90f8-86a69735e1bb-00-3mwxjpq1wcwvm.pike.replit.dev/";

const getMovies = async (url) => {
  try{
    const{data} = await axios.get(url);

    console.log(data);
    return data;
  }catch(err){

  }
};

let movies = await  getMovies(URL);
console.log(movies);


const createElement  = (element) => document.createElement
(element);

const createMovieCard = (movies) => {
  for(let movie of movies){

    const cardContainer = createElement("div");
    cardContainer.classList.add("card","shadow");

    const imageContainer = createElement("div");
    imageContainer.classList.add("card-image-container");

    const imageEle = createElement("img");
      imageEle.classList.add("card-image");
      imageEle.setAttribute("src" ,movie.image);
      imageEle.setAttribute("alt",movie.title);
      imageContainer.appendChild(imageEle);

      cardContainer.appendChild(imageContainer);

      const cardDetails = createElement("div");
      cardDetails.classList.add("movie-details");

      const titleEle = createElement("p");
        titleEle.classList.add("title");
        titleEle.innerText = movie.title;
        cardDetails.appendChild(titleEle);

        const genreEle = createElement("p");
        genreEle.classList.add("genre");
        genreEle.innerText = `Genre : ${movie.genre}`;
        cardDetails.appendChild(genreEle);

        const movieRating = createElement("div");
        movieRating.classList.add("ratings");

        const ratings = createElement("div");
        ratings.classList.add("star-rating");

        const starIcon = createElement("span");
        starIcon.classList.add("material-symbols-outlined");
        starIcon.innerText = "star";
        ratings.appendChild(starIcon);

        const ratingValue = createElement("span");
        ratingValue.innerText = movie.rating;;
        ratings.appendChild(ratingValue);

        movieRating.appendChild(ratings);

        const length = createElement("p");
        length.classList.add("duration");
        length.innerText = `${movie.duration} mins`;
         
        cardDetails.appendChild(length);
        cardDetails.appendChild(movieRating);
        cardContainer.appendChild(cardDetails);
      
     parentElement.appendChild(cardContainer);
  }
};

let filteredArrOfMovies = [];

function handleSearch(event){
  searchValue = event.target.value.toLowerCase();
  console.log(searchValue);
  let filterBySearch = getFilteredData;
  filteredArrOfMovies = searchValue?.length > 0 ? movies.filter(movie =>  searchValue === movie.title.toLowerCase()) : movies;
  console.log("filtered data" , filteredArrOfMovies);

  parentElement.innerHTML = "";
  createMovieCard(filterBySearch);
}

function getFilteredData() {
  searchValue = event.target.value.toLowerCase();
  console.log(searchValue);
  filteredArrOfMovies = searchValue?.length > 0 ? movies.filter(movie =>  searchValue === movie.title.toLowerCase()) : movies;
  console.log("filtered data" , filteredArrOfMovies);
  if(ratings > 0){
    filteredArrOfMovies = searchValue.length > 0 ?  filteredArrOfMovies : movies;
    filteredArrOfMovies =filteredArrOfMovies.filter(movie =>  movie.rating >=  ratings);
  }

  if(genre?.length > 0){
    filteredArrOfMovies = searchValue ?. length > 0 && ratings  > 7 ? filteredArrOfMovies : movies;
    filteredArrOfMovies = filteredArrOfMovies.filter((movie) =>
      movie.genre.includes(genre));
  }
  return filteredArrOfMovies;
}

function debounce(callback , delay){
  let timerId;

  return(...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    },delay);
  }
}

function handleRatingSelector(event){
  ratings=event.target.value;
  let filterByRating = getFilteredData();
  parentElement.innerHTML="";
  createMovieCard(ratings ? filterByRating : movies);
  console.log(ratings);
}

const debounceInput = debounce(handleSearch,500);

 searchInput.addEventListener("keyup", debounceInput);

 movieRating.addEventListener("change",handleRatingSelector);

 const genres = movies.reduce((acc,curr)=>{
  let genresArr = [];
  let tempGenresArr = curr.genre.split(",");
  acc=[...acc, ...tempGenresArr];
  for(let genre of acc){
    if(!genresArr.includes(genre)){
      genresArr = [...genresArr,genre];
    }
  }
  return genresArr;
 },[])
console.log(genres);

for (let genre of genres){
  const option = createElement("option");
  option.classList.add("option");
  option.setAttribute("value" , genre);
  option.innerText = genre;
  movieGenre.appendChild(option);
}

function handleGenreSelect(event){
   let genre = event.target.value;
   const filteredMoviesByGenre = getFilteredData();
   parentElement.innerHTML="";
   createMovieCard(genre ? filteredMoviesByGenre : movies);


}

movieGenre.addEventListener("change",handleGenreSelect);
createMovieCard(movies);