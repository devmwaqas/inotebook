import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Notes() {
    const { notes } = useContext(noteContext);
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col col-md-4 col-xs-12 col-sm-12">
                    <h3> Add New Notes </h3>
                    <form action="">
                        <div className="mb-3">
                            <label id="title_label" htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label id="description_label" htmlFor="description" className="required"> Description </label>
                            <textarea id="description" name="description" rows="5" className="form-control"></textarea>
                        </div>
                        <div className="mb-3">
                            <label id="tag_label" htmlFor="tag">Tag</label>
                            <input id="tag" name="tag" type="text" className="form-control" />
                        </div>
                        <button type="button" className="btn btn-primary mb-5"> Submit </button>
                    </form>

                </div>
            
                <div className="col col-md-6 offset-md-2 col-xs-12 col-sm-12">
                    <h3> Your Notes </h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Tag</th>
                            </tr>
                        </thead>
                        <tbody>

                            {notes.map((note) => {
                                return (
                                    <tr key={note._id}>
                                        <td>{note.title}</td>
                                        <td> {note.description} </td>
                                        <td> {note.tag}</td>
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
