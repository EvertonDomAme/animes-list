const urlApi = 'http://localhost:3000/animes';
const animes = document.getElementById('cardBox');
let update = false;
let idUpdate = 0;
/* let btnCheck = document.getElementById('btnCheck');
let cardCheck = document.querySelector('.card') */
const text = document.querySelector('.text');
text.innerHTML = text.innerText.split("").map(
  (char, i) => 
  `<span style="transform:rotate(${i*8.7}deg)">${char}</span>`
).join("")

const getAnimes = async () => {
  
  const response = await fetch(urlApi);
  const data = await response.json();
  console.log(data);

  data.map((anime) => {
    animes.insertAdjacentHTML('beforeend',`
  <div class="card">
    <img class="cardImage" src=${anime.imageUrl} width="170" height="240" />
    </br>
    <div class="cardInfo">
      <div class="cardText">
        <p id="cardTitle">${anime.title}</p>
        <p id="cardGender"><span id="spanGender">${anime.gender}</span></p>
      </div>
      <div class="scoreBox">
        <p id="cardScore">${anime.score}</p>
      </div>  
    </div>
    </br>
    <div class="btnChecking">
    <button type="button" id="btnCheck" class="cardChecking" onclick="toggleDone()">Seen</button>
    <button type="button" class="updateBtn" onclick="updateAnime(${anime.id})">Update</button>
    <button type="button" class="deleteBtn" onclick="deleteAnime(${anime.id})">Delete</button>
    </div>
  </div>
    `)
  })
}

getAnimes();

const submitForm = async (event) => {
   event.preventDefault();

   let title = document.getElementById('title');
   let imageUrl = document.getElementById('imageUrl');
   let gender = document.getElementById('gender');
   let score = document.getElementById('score');

  const anime = {
    title : title.value,
    imageUrl : imageUrl.value,
    gender : gender.value,
    score : score.value,
  }

  if(!update) {
    const request = new Request(`${urlApi}/add`,{
      method: 'POST',
      body: JSON.stringify(anime),
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    })
    
    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getAnimes();
      /* addToStorage(); */

    }

  }else {
    const request = new Request(`${urlApi}/${idUpdate}`,{
      method: 'PUT',
      body: JSON.stringify(anime),
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    })

    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getAnimes();
    }
  }

  title.value = '';
  imageUrl.value = '';
  gender.value = '';
  score.value = '';

  animes.innerHTML = '';
}

const getAnimeById = async (id) => {
  const response = await fetch(`${urlApi}/${id}`);
  return anime = response.json();
}

/* function toggleDone() {
  cardCheck.classList.add('seen');
}

btnCheck.addEventListener('click', toggleDone); */


const updateAnime = async (id) => {
  update = true;
  idUpdate = id;

  const anime = await getAnimeById(id);

  let titleUpd = document.getElementById('title');
  let imageUpd = document.getElementById('imageUrl');
  let genderUpd = document.getElementById('gender');
  let scoreUpd = document.getElementById('score');

  titleUpd.value = anime.title;
  imageUpd.value = anime.imageUrl;
  genderUpd.value = anime.gender;
  scoreUpd.value = anime.score;

}

const deleteAnime = async (id) => {
  const request = new Request(`${urlApi}/${id}`, {
    method: 'DELETE',
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message);

  animes.innerHTML = '';
  getAnimes();
}




/* const addToStorage = () => {
  localStorage.setItem('animes', JSON.stringify(animes));
}
const renderAnimesStorage = () => {
  let animesStorage = localStorage.getItem('animes');
  if (animesStorage) {
    animes = JSON.parse(animesStorage);
    animes.map((anime) => {
      renderAnime(anime);
    })
  }
}
animes.innerHTML = '';
renderAnimesStorage(); */