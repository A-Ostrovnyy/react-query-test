import { Link } from 'react-router-dom';

import { menuData } from './__constants';
import './PageMenu.css'

export const PageMenu = () => {
    return (
        <nav className='nav'>
            <ul className='nav_list'>
                {
                    menuData.map(({title, route}) => (
                        <li className='nav_item' key={route}>
                            <Link to={route}>{title}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
