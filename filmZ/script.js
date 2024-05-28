document.addEventListener('DOMContentLoaded', () => {
  const filmsContainer = document.getElementById('films');
  const searchForm = document.getElementById('searchForm'); 
  const searchInput = document.getElementById('search');
  const randomBtn = document.getElementById('random');

 
  async function getFilms() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/ZamiUmi/films-data/main/films.json'); 
      const data = await response.json();
      console.log('Loaded films:', data);
      return data.films;
    } catch (error) {
      console.error('Error fetching films: ', error);
      return [];
    }
  }


  function displayFilms(films) {
    filmsContainer.innerHTML = '';
    films.forEach(film => {
      const filmElement = document.createElement('div');
      filmElement.classList.add('film'); 
      filmElement.innerHTML = `
        <img src="${film.image}" alt="${film.title}" />
        <div class="film-info">
          <h3>${film.title}</h3>
          <p>${film.year}</p>
          <p>${film.genre}</p>
          <p>${film.director}</p>
        </div>
      `;
      filmsContainer.appendChild(filmElement);
    });
  }

 
  async function searchFilms(term) {
    const films = await getFilms();
    const filteredFilms = films.filter(film =>
      film.title.toLowerCase().includes(term.toLowerCase())
    );
    console.log('Filtered films:', filteredFilms); 
    displayFilms(filteredFilms);
  }

 
  async function getRandomFilm() {
    const films = await getFilms();
    const randomIndex = Math.floor(Math.random() * films.length);
    const randomFilm = films[randomIndex];
    displayFilms([randomFilm]);
  }

 
  function filterFilmsByGenre(genre) {
    const films = getFilms(); 
    const filteredFilms = films.filter(film =>
      film.genre.toLowerCase().includes(genre.toLowerCase())
    );
    displayFilms(filteredFilms);
  }

 
  const genreButtons = document.querySelectorAll('.genre');
  genreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const genre = button.textContent.trim(); 
      filterFilmsByGenre(genre); 
    });
  });

 
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      searchFilms(searchTerm);
    }
    searchInput.value = '';
  });

 
  randomBtn.addEventListener('click', getRandomFilm);

 
  getFilms().then(displayFilms);
});
