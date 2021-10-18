import * as React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {

    return(

        <div className="bg-dark">
            <Link type="button" className="m-2 btn btn-outline-primary" to="/">
                Home
            </Link>
            <Link type="button" className="m-2 btn btn-outline-primary" to="/overview">
                All Users
            </Link>



        </div>
    )
}

export default Navbar;