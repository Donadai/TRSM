function Poi({poi}) {

    if (poi.image !== null)
    {
        return (
            <div className="poi">
                <div className='image'>
                    <img src={require('../assets/poi_images/houseofperkunas.png')} alt="alternatetext"/>
                </div>        
                <div className= 'text'>
                    {poi.description}
                </div>
            </div>
        )
    }
}

export default Poi