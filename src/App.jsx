import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		(async () => {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ searchText: 'mann' })
			};
			const response = await fetch('http://localhost:3055/searchbooks', requestOptions);
			const books = await response.json();
			setBooks([...books]);
		})();
	}, []);

	return (
		<div className="App">
			{books.length === 0 && (
				<div>Loading...</div>
			)}
			{books.length > 0 && (
				<>
					There are {books.length} books:
					<ul>
						{books.map((book, i) => {
							return (
								<li key={i}>{book.title}</li>
							)
						})}
					</ul>
				</>
			)}
		</div>
	)
}

export default App
