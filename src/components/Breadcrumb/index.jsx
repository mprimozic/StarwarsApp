import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import './index.scss';

const Breadcrumb = () => {
    const location = useLocation();
    return(
        <div className="container mt-3">
            <nav aria-label="breadcrumb">
            <Link to={'/'}
                className={location.pathname === '/' ?'breadcrumb-active' : 'breadcrumb-not-active'}>Home
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link to={'/specie/wookie'}
                className={location.pathname === '/specie/wookie' ?'breadcrumb-active' : 'breadcrumb-not-active'}>Wookie
            </Link>        
        </nav>
        </div>
    );
}

export default Breadcrumb;