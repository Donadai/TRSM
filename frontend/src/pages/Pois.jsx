import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {toast} from 'react-toastify'
import { getPois, reset } from "../features/pois/poiSlice"
import Poi from "../components/Poi"
import Spinner from "../components/Spinner"


function Pois(){
    const dispatch = useDispatch()

    const {pois, isLoading, isError, message} = useSelector((state) => state.pois)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getPois())

        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className="pois">
            {pois.length > 0 && (
                pois.map((poi) => {
                    return (
                        <Poi key={poi._id} poi={poi} />
                    )        
                })
            )}
        </div>
    )
}

export default Pois