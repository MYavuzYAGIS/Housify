import React from 'react';
import {Layout} from 'antd';
import {Link} from 'react-router-dom';
import {Viewer} from '../../lib/types';
import Icon from "./assets/logo.svg";
import { MenuItems } from './components';

const {Header} = Layout;

interface Props{
    viewer:Viewer;
    setViewer:(viewer:Viewer)=>void;

}
export const AppHeader = ({viewer,setViewer}:Props) => {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <Link to="/">
                        <img src={Icon} className="app-logo" alt="logo" />
                    </Link>
                </div>
            </div>
            <div className='app-header__menu-section'>
                <MenuItems viewer={viewer} setViewer={setViewer} />
            </div>

        </Header>
    );
}