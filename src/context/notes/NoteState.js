import { useState } from 'react';
import noteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000/api/";
    const mynotes = [];
    const [notes, setNotes] = useState(mynotes);

    const getAllNotes = async () => {

        const response = await fetch(`${host}notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('token')
            }
        });

        const notes = await response.json();
        setNotes(notes);
    }

    //Add a Note
    const addNote = async (title, description, tag) => {

        const data =
        {
            title: title,
            description: description,
            tag: tag
        };

        const response = await fetch(`${host}notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        const allnotes = await response.json();
        // setNotes([]);
        setNotes(notes.concat(allnotes.notes));
    }

    //Delete a Note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}notes/deletenote/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('token')
            }
        });
        const result = await response.json();
        if(result.msg === "success"){
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        }
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {

        const data = {
            "title": title,
            "description": description,
            "tag": tag
        };

        const response = await fetch(`${host}notes/updatenote/${id}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });

        await response.json();
        getAllNotes();

    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState