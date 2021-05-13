import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BiHome } from 'react-icons/bi';


export default class Header extends Component {
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
                </nav>
            </div>
        )
    }
}