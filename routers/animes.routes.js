const express = require('express');
const router = express.Router();
const animes = [
  {
    id: Date.now(),
    checked: false,
    title: "Bleach",
    imageUrl: "https://sideral-animes-designed.webnode.com/_files/system_preview_detail_200004602-ae4d2af47a/capa.jpg",
    gender: "Action",
    score: "7"
  },
]

router.get('/', (req, res) => {
  res.send(animes);
})

router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const index = animes.findIndex(anime => anime.id == idParam);
  const anime = animes[index];
  res.send(anime);
})

router.put('/:id', (req, res) => {
  const animeUpdate = req.body;
  const id = req.params.id;
  let existingAnime = animes.find((anime) => anime.id == id);

  existingAnime.title = animeUpdate.title;
  existingAnime.imageUrl = animeUpdate.imageUrl;
  existingAnime.gender = animeUpdate.gender;
  existingAnime.score = animeUpdate.score;

  res.send({
    message: `Anime ${existingAnime.title} successfully updated`,
    data: existingAnime
  })
})

router.post('/add', (req, res) => {
  const anime = req.body;
  anime.id = Date.now();
  anime.checked = false;
  animes.push(anime);
  res.status(201).send({
    message: 'Anime cadastrado com sucesso',
    data: anime
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const index = animes.findIndex((anime) => anime.id == id);
  animes.splice(index, 1);

  res.send({
    message: `Anime successfully deleted`,
  })
})

module.exports = router;