import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Search from './Search';
import { AuthContext } from './AuthContext';
import Album from './Album';

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
        <div>
            <Search getSearchText={getSearchText}/>
            <div>{accessToken}</div>
            <div>{searchText}</div>
            {albums.length !== 0 && (
                albums.map((album) => {
                    return <div key={album.id}>
                        <Album album={album}/>
                    </div>
                })
            )}
        </div>
    );
}