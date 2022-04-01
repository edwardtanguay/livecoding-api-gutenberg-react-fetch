import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3055;
app.use(cors());

app.get('/', (req, res) => {
	res.send('This is the Gutenberg API. Use /searchbooks');
});

const getBooks = async () => {
	const books = [];
	const response = await axios.get('https://gutendex.com/books/?search=nietzsche');
	const rawBooks = response.data.results;
	rawBooks.forEach(rawBook => {
		books.push({
			title: rawBook.title
		});
	})
	return books;
}

app.get('/searchbooks', async (req, res) => {
	const books = await getBooks();
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