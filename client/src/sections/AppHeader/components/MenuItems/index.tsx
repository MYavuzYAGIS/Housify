import React from 'react';
import {Link} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {Avatar,Button,Menu} from 'antd';
import {HomeOutlined,LogoutOutlined,UserOutlined } from "@ant-design/icons";
import { LOG_OUT} from '../../../../lib/graphql/mutations';
import { LogOut as LogOUtData} from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { displaySuccessNotification,displayErrorMessage} from '../../../../lib/utils';
  

import{Viewer} from '../../../../lib/types';

interface Props{
    viewer:Viewer;
    setViewer:(viewer:Viewer)=>void;
}

const {Item,SubMenu} = Menu;

export const MenuItems = ({ viewer,setViewer }: Props) => {
    const [logOut] = useMutation<LogOUtData>(LOG_OUT,{
        onCompleted:(data)=>{
            if (data && data.logOut){
                setViewer(data.logOut);
                sessionStorage.removeItem('token');
                displaySuccessNotification('You have successfully logged out');
            }
        },
        onError:data=>{
            displayErrorMessage("Sorry, we couldn't log you out"); 
        }
    });
    const handleLogOut = () => {
        logOut();
    }
    const subMenuLogin = viewer.id && viewer.avatar? (
      <SubMenu title={<Avatar src={viewer.avatar} />}  >
        <Item key="/user">
            <Link to={`/user/${viewer.id}`}>
              <UserOutlined type="user" />
                Profile
          </Link>
        </Item>
        <Item key="/logout">
            <div onClick={handleLogOut}>
                <LogoutOutlined  type="logout" />
                Log out
           </div>
        </Item>
      </SubMenu> 
    ) : (
      <Item>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );  
    return (
      <Menu mode="horizontal" selectable={false} className="menu">
        <Item key="/host">
          <Link to="/host">
            <HomeOutlined type="home" />
            Host
          </Link>
        </Item>
            <Item>
            {subMenuLogin}
            </Item>  
      </Menu>
    );
  };