import React, {Component} from 'react';

class Navigation extends Component {
    render() {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ backgroundColor: "black", minWidth: "100%", position: "fixed"}}>
                <div className="container-fluid" style={{marginLeft: "20px", color: "white", backgroundColor: "black"}}>
                    <div className="navbar-brand" to="/" style={{ padding: "20px", fontSize: "20px", fontWeight: "400"}}>🚀 ABC Company</div>
                </div>
                </nav><br /><br /><br />
            </>
        );
    }
}

export default Navigation;
