import React from 'react';
import {Layout} from 'antd';
import Icon from "./assets/logo.svg";

const {Header} = Layout;

export function AppHeaderSkeleton() {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <img src={Icon} alt="App logo" />
                </div>
            </div>
        </Header>
    );
}