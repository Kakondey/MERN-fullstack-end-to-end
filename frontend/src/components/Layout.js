import React from 'react';
import Header from './Header';
import Sidebar from "./Sidebar";
const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <div className="navigationWrapper">
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Layout;