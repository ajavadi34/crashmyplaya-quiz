import React from 'react';

export default function Choice({ choice, setSelection }) {
    return (
        <div role="button">
            {choice.title && <h3 onClick={() => setSelection(choice)}>{choice.title}</h3>}
            {choice.imgUrl && <img src={choice.imgUrl} height="100px" alt={choice.alt} onClick={() => setSelection(choice)} />}
        </div>
    );
}