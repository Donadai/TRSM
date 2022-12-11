import {useState} from 'react'
import Spinner from "./Spinner";

function SearchBar({placeholder, data, selectData}) {
    const [filteredData, setFilteredData] = useState([]);
    
    const handleFilter = (e) => {
        const searchWord = e.target.value
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === "") {
            setFilteredData([])
        }
        else {
            setFilteredData(newFilter)
        }    
        
        selectData(searchWord)
    }

    if(data == null) {
        return <Spinner/>
    } else {
        return (          
            <div className="searchBar">
                <div className="searchInputs">
                    <input list="searchData" placeholder={placeholder} onChange={handleFilter}></input>
                </div>
                <div className="form-group">
                    <datalist id='searchData'>
                        {filteredData.map((data) => <option key={data._id}>{data.name}</option>)}
                    </datalist>
                </div>
            </div>
        )
    }
}

export default SearchBar