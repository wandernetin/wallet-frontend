import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Category from '../category/category';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/category" component={Category} />
        </BrowserRouter>
    )
}