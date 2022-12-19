import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { MdEdit } from "react-icons/md"
import EditSearchBar from "./EditSearchBar";
import { updatePost } from "../features/posts/postSlice";

export default function PostEditModal ({post}) {
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }

    const [editFormData, setEditFormData] = useState({
        editedDescription: post.description,
        editedPoi: post.poi,
      })

    const {editedPoi, editedDescription} = editFormData
    const {pois} = useSelector((state) => state.pois)

    const handlePoiEdit = poiName => {
        const foundPoi = pois.find(p => {
            return p.name === poiName
        });
        if (foundPoi) {
            setEditFormData({
                editedPoi: foundPoi           
            })
        }
    }

    const onChange = (e) => {
        setEditFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const postData = {
            id: post._id, poi: editedPoi, description: editedDescription
        }
        dispatch(updatePost(postData))
    }

    
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button className="btn-edit" onClick={toggleModal}>
                <MdEdit />
            </button>

            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}> </div>
                    <div className="modal-content">
                        <h2> Edit post </h2>

                        <section className='form'>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">          
                                    <EditSearchBar placeholder={editedPoi.name} data={pois} selectData={handlePoiEdit}/>               
                                </div>
                                <div className="form-group">
                                    <textarea type='text' name='editedDescription' id='editedDescription' placeholder={editedDescription} value={editedDescription} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block" type='submit' onClick={onSubmit}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </section>

                        <button className="close-modal" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    ); 
}