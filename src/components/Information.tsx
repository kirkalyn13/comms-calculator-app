import React from 'react'

type InfoTypes = {
    title: string,
    content: string
}

const Information = ({title, content}:InfoTypes) => {
    return (
        <div className="container-info">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    )
}

export default Information
