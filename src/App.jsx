import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [books, setBooks] = useState([]);
	const [searchText, setSearchText] = useState('');

	const lookupBooks = async () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ searchText })
		};
		const response = await fetch('http://localhost:3055/searchbooks', requestOptions);
		const books = await response.json();
		setBooks([...books]);
	}

	useEffect(() => {
		lookupBooks();
	}, []);

	const handleButtonClick = () => {
		lookupBooks();
	}

	return (
		<div className="App">
			{books.length === 0 && (
				<div>Loading...</div>
			)}
			{books.length > 0 && (
				<>
					<input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
					<button onClick={handleButtonClick}>Search</button>
					<div>
						There are {books.length} books:
					</div>
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
