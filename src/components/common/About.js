import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="text-center" style={{ marginTop: '200px' }}>
                <h2 style={{ fontStyle: 'italic' }}>About this project</h2>
                <p>Sponsored by <strong>Bui Duc Tai</strong></p>
                <p>Please enjoy every lines of code <a href="https://taibdse.github.io">here</a></p>
            </div>
        );
    }
}

export default About;
