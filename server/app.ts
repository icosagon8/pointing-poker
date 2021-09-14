import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
