import React from "react";
import Choice from './Choice'

export default function MultiChoiceQuestion({ question, answerId, choices, setSelectedAnswer }) {
    return (
        <div className='container'>
            <div className='row mb-4'>
                <h1>{question}</h1>
            </div>
            <div className='row'>
                {choices.map(choice =>
                    <div className='col-md-3 mb-2' key={choice.id}>
                        <Choice
                            choice={choice}
                            setSelection={setSelectedAnswer}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}