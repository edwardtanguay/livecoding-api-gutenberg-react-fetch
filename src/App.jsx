import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch('http://localhost:3055/searchbooks');
			const books = await response.json();
			console.log(books);
			setBooks([...books]);
		})();
	}, []);

	return (
		<div className="App">
			There are {books.length} books.
		</div>
	)
}

export default App
