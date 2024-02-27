import data from './component/Entity.json'
import './Dummy.css'
export default function Dummy() {
    return (
        <>
        <div className='details'>
        <h2>DETAILS</h2>
        <p>user_name: {data.user_name}</p>
        <p>email: {data.email}</p>
        <p>Watched_videos: {data.Watched_videos}</p>
        <p>Likes: {data.Likes}</p>
        <p>Comments: {data.Comments}</p>
        </div>

        </>
    )
}