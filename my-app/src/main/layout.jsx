import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Category from '../category/category';

import Header from './header';
import Footer from './footer';

export default class Layout extends Component {
    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="container-ext flex-fill">
                    <Switch>
                        <Route path="/category" component={Category} />
                    </Switch>
                </main>
                <Footer />
            </div>
        )
    }
}