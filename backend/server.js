import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3055;
app.use(cors());

app.get('/', (req, res) => {
	res.send('This is the Gutenberg API. Use /searchbooks');
});



app.get('/searchbooks', (req, res) => {

	(async () => {
		const response = await axios.get('https://gutendex.com/books/?search=nietzsche');
		const rawBooks = response.data;
		console.log(rawBooks);
	})();

	res.json([
		{
			title: "111"
		},
		{
			title: "222"
		}
	]);
});

app.listen(port, () => {
	console.log(`listening at: http://localhost:${port}`);
});