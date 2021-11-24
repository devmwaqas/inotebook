import { useState } from 'react';
import noteContext from './noteContext'

const NoteState = (props) => {

    const mynotes = [{
        "_id": "619ccb2403fa96d7ce9d34b7",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:12.111Z",
        "__v": 0
      },
      {
        "_id": "619ccb2503fa96d7ce9d34b9",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:13.892Z",
        "__v": 0
      },
      {
        "_id": "619ccb2603fa96d7ce9d34bb",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:14.432Z",
        "__v": 0
      },
      {
        "_id": "619ccb2603fa96d7ce9d34bd",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:14.614Z",
        "__v": 0
      },
      {
        "_id": "619ccb2603fa96d7ce9d34c1",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:14.999Z",
        "__v": 0
      },
      {
        "_id": "619ccb2703fa96d7ce9d34c3",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:15.183Z",
        "__v": 0
      },
      {
        "_id": "619ccb2703fa96d7ce9d34c5",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:15.375Z",
        "__v": 0
      },
      {
        "_id": "619ccb2703fa96d7ce9d34c7",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:15.558Z",
        "__v": 0
      },
      {
        "_id": "619ccb2703fa96d7ce9d34c9",
        "user": "619b9b25124c0f45fecf72a9",
        "title": "Science Notes",
        "description": "Its my first science notes",
        "tag": "Science",
        "created_at": "2021-11-23T11:06:15.742Z",
        "__v": 0
      }];

    const [notes, setNotes] = useState(mynotes);

    return(
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState