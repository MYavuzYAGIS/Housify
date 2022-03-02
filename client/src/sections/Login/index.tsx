import React, {useEffect, useRef} from "react";
import {Navigate} from "react-router-dom";
import {Card, Spin,Layout, Typography} from 'antd';
import googleLogo from './assets/google_logo.png';
import Housify from './assets/housify.png';
import {Viewer} from '../../lib/types';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {ErrorBanner} from '../../lib/components/';
import {displaySuccessNotification, displayErrorMessage} from '../../lib/utils';
import {LOG_IN} from "../../lib/graphql/mutations";
import {AUTH_URL} from "../../lib/graphql/queries/AuthUrl";
import {LogIn as LogInData, LogInVariables} from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import {AuthUrl as AuthUrlData} from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";

interface Props{
  setViewer:(viewer:Viewer)=>void;
};

const {Content} = Layout;
const {Title,Text} = Typography;


export const Login = ({setViewer}:Props) => {
  const client = useApolloClient();
  const [logIn, {data:logInData, loading:logInLoading, error:logInError}] = useMutation<LogInData, LogInVariables>(LOG_IN,{
    onCompleted: (data) => {
      if(data && data.logIn && data.logIn.token){
        setViewer(data.logIn);
        sessionStorage.setItem('token', data.logIn.token);
        displaySuccessNotification("You have successfully logged in!");
      }
    }
  });





  const logInRef = useRef(logIn);

  useEffect(()=>{
    const code = new URL(window.location.href).searchParams.get('code');
    if (code){
      logInRef.current({variables:{input:{code}}})
      
    }
  },[])
  const handleAuthorize = async () =>  {
    try {
      const {data} = await client.query<AuthUrlData>({
        query: AUTH_URL
      });
      window.location.href = data.authUrl; 
    } catch (error) {
      console.error(error);
      displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!");
    } 
  };
  
  if (logInLoading){
    return (
      <Content className="log-in" > 
        <Spin size="large" tip="Logging You In Gracefully..." />
      </Content>
    )
  }

  if (logInData && logInData.logIn){
    const {id:vieverID} = logInData.logIn;
    return <Navigate to={`/user/${vieverID}`} />;
  }



  const logInErrorBanner = logInError? <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!"/> : null;
  return (
    <Content className="log-in">
      {logInErrorBanner}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
            <img
            src={Housify}
            alt="Google Logo"
            className="log-in-card__housify-logo"
          />
            </span>
            {/* <span role="img" aria-label="wave">
              👋
            </span> */}
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to Housify!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button className="log-in-card__google-button" onClick={handleAuthorize}>
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">Sign in with Google</span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form to sign in
          with your Google account.
        </Text>
      </Card>
    </Content>
  );
};