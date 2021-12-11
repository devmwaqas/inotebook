import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote() {

    const context = useContext(noteContext);

    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const submitNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    } 

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h3> Add New Notes </h3>
            <form action="">
                <div className="mb-3">
                    <label id="title_label" htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" className="form-control" onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label id="description_label" htmlFor="description" className="required"> Description </label>
                    <textarea id="description" name="description" rows="5" className="form-control" onChange={onChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label id="tag_label" htmlFor="tag">Tag</label>
                    <input id="tag" name="tag" type="text" className="form-control" onChange={onChange} />
                </div>
                <button type="button" className="btn btn-primary mb-5" onClick={submitNote}> Add Note </button>
            </form>
        </div>
    )
}