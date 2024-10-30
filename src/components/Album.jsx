import { Link } from 'react-router-dom'
import './Album.css';

export default function Album({ album }) {
    return (
        <Link to={album.id} className="album-card">
            <img src={album.images[1].url} alt={album.name} />
            <p>{album.name}</p>
            <p className="album-info">{`${new Date(album.release_date).getFullYear()} · ${album.artists[0].name}`}</p>
        </Link>
    );
}