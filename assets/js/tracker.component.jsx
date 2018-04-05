import React from 'react';

export class Tracker extends React.Component {
    render() {
        return(
            <div className={'container mt-5'}>
                <div><h1>Hello</h1></div>
                <div className={'row'}>
                    <div className={'col'}>1</div>
                    <div className={'col'}>2</div>
                    <div className={'col'}>3</div>
                    <div className={'col'}>4</div>
                </div>
            </div>
        );
    }
}