import express from 'express';

const app = express();
const port = 3055;

app.get('/', (req, res) => {
	res.send('This is the Gutenberg API. Use /searchbooks');
});

app.get('/searchbooks', (req, res) => {
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