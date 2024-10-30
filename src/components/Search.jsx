import { useState } from 'react';
import './Search.css';

export default function Search({ getSearchText }) {
    const [searchText, setSearchText] = useState('');

    const searchInputHandler = (e) => {
        setSearchText(e.target.value);
    };

    const setSearchHandler = (e) => {
        e.preventDefault();
        getSearchText(searchText);
    };

    return (
        <div className="search-container">
            <form action="">
                <input
                    type="text"
                    id="search"
                    placeholder="search..."
                    onChange={searchInputHandler}
                />
                <button type="submit" onClick={setSearchHandler}>
                    검색
                </button>
            </form>
        </div>
    );
}
