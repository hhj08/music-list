import axios from 'axios';
import { useLoaderData } from 'react-router-dom';


export default function AlbumDetail() {
    const tracks = useLoaderData();

    return (
        <div>
            <p>엘범 상세페이지</p>
            <div>{tracks.map(track => <div key={track.id}>{track.name}</div>)}</div>
        </div>

    );
}

export async function loader({params}) {
    const accessToken = localStorage.getItem('accessToken');

    const res = await axios.get(`https://api.spotify.com/v1/albums/${params.id}/tracks?market=KR`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });

    return res.data.items;
}