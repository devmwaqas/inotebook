import React from 'react'

export default function Alert(props) {
    return (
        <div>
           { props.alert && <div className={`alert alert-${props.alert.type}`}>
                {props.alert.message}
            </div> }
        </div>
    )
}
