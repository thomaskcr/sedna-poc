import React, { useEffect, useState } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom';

import { LayoutBase } from './components/layout/LayoutBase';
import { LayoutApp } from './components/layout/LayoutApp';
import { LayoutMinimal } from './components/layout/LayoutMinimal';

import { PrivateRoutes } from "./router/PrivateRoutes"

import './platform/styles/bootstrap.scss';
import './platform/styles/main.scss';
import './platform/styles/theme.scss';
import './platform/styles/colors.scss';
import './app.scss';

import 'bootstrap/dist/js/bootstrap.js';

import LoginForm from "./pages/LoginPage";

import { Auth, Hub } from 'aws-amplify';
import { amplifyConfig } from "./utils/amplifyConfig";
import {NotFound} from "./pages/NotFound";
import {ListUsers} from "./components/users/ListUsers";
import userStore from "./store/userStore";
import WelcomePage from './pages/WelcomePage';

Auth.configure(amplifyConfig);

function App() {
    const setUser = userStore(state => state.setUser)
    const [customState, setCustomState] = useState(null);
    const clearUser = userStore(state => state.clearUser);
    //const [activeSession, setActiveSession] = useState(false);


    /*
    useEffect(() => {
        
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    setUser(data.signInUserSession.idToken.jwtToken, data.signInUserSession.idToken.payload);
                    break;
                case "signOut":
                    setUser(null);
                    clearUser();
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });

        Auth.currentSession().then(res => {
            setActiveSession(true);
        }).catch(() => {
            clearUser();
            setActiveSession(false);
        });

        return unsubscribe;
        
    }, []);
    */

    const activeSession = userStore(state => state.signedIn);
    
    return (
        <LayoutBase>
            <Routes>
                {activeSession ?
                    <>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/" element={<Navigate to="/users" />} />
                            <Route element={<WelcomePage />} path="/welcome" />
                            <Route element={<LayoutApp />}>
                                <Route element={<ListUsers />} path="/users" />
                                <Route element={<NotFound />} path="/not-found" />
                            </Route>
                        </Route>
                    </> : <>
                        <Route element={<LayoutMinimal />}>
                            <Route element={<LoginForm />} path="/" />
                            <Route element={<NotFound />} path="/not-found" />
                            <Route element={<LoginForm />} path="/login" />
                        </Route>
                    </>
                }
            </Routes>
        </LayoutBase>
    );
}

export default App;