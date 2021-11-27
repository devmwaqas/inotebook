import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes() {

    const { notes, deleteNote, getAllNotes, editNote } = useContext(noteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const myModal = useRef(null);
    const myModalclose = useRef(null);

    const editModal = (enote) => {
        setNote({ id: enote._id, etitle: enote.title, edescription: enote.description, etag: enote.tag });
        myModal.current.click();
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }


    const updatenote = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        myModalclose.current.click();
    }

    return (
        <div className="container my-5">

            <button type="button" ref={myModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden>
                Open Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form action="">
                                <div className="mb-3">
                                    <label id="etitle_label" htmlFor="etitle">Title</label>
                                    <input id="etitle" name="etitle" type="text" className="form-control" onChange={onChange}  value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label id="edescription_label" htmlFor="edescription" className="required"> Description </label>
                                    <textarea id="edescription" name="edescription" rows="5" className="form-control" onChange={onChange}  value={note.edescription} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label id="etag_label" htmlFor="etag">Tag</label>
                                    <input id="etag" name="etag" type="text" className="form-control" onChange={onChange} value={note.etag} />
                                </div>
                               
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={myModalclose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={updatenote} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">

                <div className="col col-md-4 col-xs-12 col-sm-12">
                    <AddNote />
                </div>

                <div className="col col-md-6 offset-md-2 col-xs-12 col-sm-12">
                    <h3> Your Notes </h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Tag</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {notes.length === 0 && <tr><td colSpan="4"> No records found </td></tr> }

                            {notes.map((note) => {
                                return (
                                    <tr key={note._id}>
                                        <td>{note.title}</td>
                                        <td> {note.description} </td>
                                        <td> {note.tag}</td>
                                        <td>
                                            <i className="far fa-trash-alt mx-2 ilink" onClick={() => (deleteNote(note._id))}></i>

                                            <i className="far fa-edit mx-2  ilink" onClick={() => (editModal(note))}></i>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
