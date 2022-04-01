import express from 'express';

const app = express();
const port = 3055;

app.get('/', (req, res) => {
	res.send('works');
});

app.listen(port, () => {
	console.log(`listening at: http://localhost:${port}`);
});