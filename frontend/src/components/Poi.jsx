import Spinner from "./Spinner"

function Poi({poi}) {

    if (poi.image !== null)
    {
        return (
            <>
                <div className='poiContent'>
                    <div className='image'>
                        <img src={require('../assets/poi_images/' + poi.image)} alt="alternatetext"/>
                    </div>        
                    <div className= 'text'>
                        {poi.description}
                    </div>
    
                </div>
            </>
        )
    }
}

export default Poi