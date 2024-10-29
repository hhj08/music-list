import { Link } from 'react-router-dom'

export default function Album({album}) {
    return (
        <Link to={album.id}>
            <img src={album.images[1].url} alt=""/>
            <h3>{album.name}</h3>
            <h3>{new Date(album.release_date).getFullYear()}</h3>
        </Link>
    );
}