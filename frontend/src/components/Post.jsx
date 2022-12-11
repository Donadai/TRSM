import Poi from "./Poi";

function Post({poi}) {
    console.log(poi);
    return (
        <>
            <div className='poiContent'>
                <div className='image'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/House_of_Perk%C5%ABnas%2C_Kaunas%2C_Lithuania_-_Diliff.jpg/800px-House_of_Perk%C5%ABnas%2C_Kaunas%2C_Lithuania_-_Diliff.jpg" alt="alternatetext"/>
                </div>        
                <div className= 'text'>
                    {poi.description}
                </div>

            </div>
        </>
    )
}

export default Poi