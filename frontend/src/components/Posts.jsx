import {useState} from 'react'
import Spinner from "./Spinner";

function Posts({posts}) {

    return (          
        <div className="searchBar">
            <div className="searchInputs">
                <input list="searchData" placeholder={placeholder} onChange={handleFilter}></input>
            </div>
            <div className="form-group">
                <datalist id='searchData'>
                    {filteredData.map((data) => <option>{data.name}</option>)}
                </datalist>
            </div>
        </div>
    )
}

export default SearchBar