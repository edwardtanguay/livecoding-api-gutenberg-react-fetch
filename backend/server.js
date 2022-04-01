import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3055;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('This is the Gutenberg API. Use /searchbooks');
});

const getBooks = async (searchText) => {
	const books = [];
	const url = `https://gutendex.com/books/?search=${searchText}`;
	console.log(url);
	const response = await axios.get(url);
	const rawBooks = response.data.results;
	rawBooks.forEach(rawBook => {
		books.push({
			title: rawBook.title
		});
	})
	return books;
}

app.post('/searchbooks', async (req, res) => {
	const searchText = req.body.searchText;
	console.log(searchText);
	const books = await getBooks(req.body.searchText);
	res.json(books);
});

app.listen(port, () => {
	console.log(`listening at: http://localhost:${port}`);
});