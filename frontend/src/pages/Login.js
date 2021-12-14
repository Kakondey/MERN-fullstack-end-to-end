import {Component} from "react";
import {Link} from "react-router-dom";
import '../css/login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form>
                            <h3>Sign In</h3>

                            <div className="form-group mb-2">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group mb-2">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <Link to="/" type="submit" className="btn btn-primary btn-block">Submit</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}