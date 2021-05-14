import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BiHome } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';

import AuthService from '../services/auth.service';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light bg-gray-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                <BiHome className="nav-icon" size={20} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/expense"} className="nav-link">
                                Expense
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/income"} className="nav-link">
                                Income
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/category"} className="nav-link">
                                Category
                            </Link>
                        </li>
                    </div>
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                <BiLogOut className="nav-icon" size={20} />
                            </a>
                        </li>
                    </div>
                </nav>
            </div>
        )
    }
}