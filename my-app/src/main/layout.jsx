import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Category from '../category/category';
import Income from '../income/income';
import Expense from '../expense/expense';
import Dashboard from '../dashboard/dashboard';

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
                        <Route path="/income" component={Income} />
                        <Route path="/expense" component={Expense} />
                        <Route path="/" component={Dashboard} />
                    </Switch>
                </main>
                <Footer />
            </div>
        )
    }
}