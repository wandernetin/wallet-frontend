import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import CategoryList from '../category/categoryList';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/category" component={CategoryList} />
        </BrowserRouter>
    )
}