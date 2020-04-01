import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ClientSearch from './pages/client-search';
import LoanSimulator from './pages/loan-simulator';
import LoanMethod from './pages/loan-method';

const Routes = () => (
    <BrowserRouter>
        <Switch>        
            <Route exact path="/" component={LoanSimulator} />
            <Route path="/emprestimo/simular-emprestimo" component={LoanSimulator} />
            <Route path="/emprestimo/pesquisar-clientes" component={ClientSearch} />
            <Route path="/emprestimo/metodo-de-emprestimo" component={LoanMethod} />
        </Switch>
    </BrowserRouter>
);

export default Routes;