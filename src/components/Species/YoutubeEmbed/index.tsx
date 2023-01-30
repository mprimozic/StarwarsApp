import './index.scss';

const YoutubeEmbed = ({videoId}: any) => {
    return(
        <div className='video-responsive container'>
            <iframe 
                width='853'
                height='480'
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media"
                title='Embedded youtube video'>
            </iframe>
        </div>
    );
;}



export default YoutubeEmbed;
