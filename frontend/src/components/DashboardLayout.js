import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from "./Layout";

const DashboardLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <Layout>
                <Component {...matchProps} />
            </Layout>
        )} />
    )
};

export default DashboardLayoutRoute;