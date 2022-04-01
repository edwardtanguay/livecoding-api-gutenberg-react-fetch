import { useState, useEffect } from 'react'
import './App.scss'
import { FaSpinner } from 'react-icons/fa';

function App() {
	const [books, setBooks] = useState([]);
	const [searchText, setSearchText] = useState([]);
	const [searchingBooks, setSearchingBooks] = useState(true);

	const lookupBooks = async () => {
		setSearchingBooks(true);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ searchText })
		};
		const response = await fetch('http://localhost:3055/searchbooks', requestOptions);
		const books = await response.json();
		setSearchingBooks(false);
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
			{searchingBooks && (
				<div><FaSpinner className="spinner" /></div>
			)}
			{!searchingBooks && (
				<>
					<input className="searchText" autoFocus type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
					<button className="btnSearch" onClick={handleButtonClick}>Search</button>
					{books.length === 0 && (
						<div className="message">No books found.</div>
					)}
					<div className="books">
						{books.map((book, i) => {
							return (
								<div key={i} className="book">
									<img class="cover" src={book.imageUrl}/>
									<div className="info">
										<div className="title">{book.title}</div>
									</div>
								</div>
							)
						})}
					</div>
				</>
			)}
		</div>
	)
}

export default App
