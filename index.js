const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const animesRouter = require('./routers/animes.routes');

app.use('/animes', animesRouter);

app.get('/', (req, res) =>{
  res.send('Welcome back, Friend!');
})

const port =3000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
})