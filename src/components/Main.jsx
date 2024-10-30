import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Search from './Search';
import { AuthContext } from './AuthContext';
import Album from './Album';
import './Main.css';

export default function Main() {
    const { accessToken } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [albums, setAlbums] = useState([]);

    const getSearchText = (text) => {
        setSearchText(text);
    }

    useEffect(() => {
        if(searchText !== '') {
            const params = {
                q: searchText,
                type: 'album',
                // limit: 10,
                // offset: 0,
                // market: 'KR'
            }

            const searchAlbums = async () => {

                const res = await  axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params
                });

                const data = res.data.albums.items;
                setAlbums(data);
            }

            searchAlbums();
        }

    }, [searchText]);

    return (
        <div className="main-container">
            {albums.length === 0 && (
                <h1 className="search-header">원하는 음악을 검색해보세요 </h1>
            )}
            <Search getSearchText={getSearchText}/>
            {albums.length !== 0 && (
                <div className="albums-grid">
                    {albums.map((album) => (
                        <div key={album.id}>
                            <Album album={album}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}