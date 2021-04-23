import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <hr className="p-0 m-0 b-0"></hr>
                    <div className="bg-gray-dark py-2">
                        <div className="container text-center">
                            © 2021 <a href="http://localhost" rel="noopener noreferrer" target="_blank">Wander Neto</a>. All rights reserved. <a href="mailto:wander.dmneto@gmail.com" target="hidden-iframe">Contact Us</a>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}