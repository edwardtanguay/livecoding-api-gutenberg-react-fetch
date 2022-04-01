import { useState, useEffect } from 'react'
import './App.scss'
import { FaSpinner } from 'react-icons/fa';

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
		setBooks([]);
		lookupBooks();
	}

	return (
		<div className="App">
			<h1>Gutenberg Project Books Search</h1>
			{books.length === 0 && (
				<div><FaSpinner className="spinner" /></div>
			)}
			{books.length > 0 && (
				<>
					<input className="searchText" autoFocus type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
					<button className="btnSearch" onClick={handleButtonClick}>Search</button>
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
