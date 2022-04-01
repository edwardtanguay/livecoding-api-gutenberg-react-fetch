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
	const response = await axios.get(url);
	const rawBooks = response.data.results;
	rawBooks.forEach(rawBook => {
		books.push({
			title: rawBook.title,
			imageUrl: rawBook.formats['image/jpeg'] ? rawBook.formats['image/jpeg'] : 'images/blank.png',
			author: rawBook.authors && rawBook.authors.length > 0 ? rawBook.authors[0].name : '(no author listed)',
			bookUrl: rawBook.formats['text/html; charset=us-ascii'] ? rawBook.formats['text/html; charset=us-ascii'] : '',
		});
	})
	return books;
}

app.post('/searchbooks', async (req, res) => {
	const searchText = req.body.searchText;
	const books = await getBooks(req.body.searchText);
	res.json(books);
});

app.listen(port, () => {
	console.log(`listening at: http://localhost:${port}`);
});