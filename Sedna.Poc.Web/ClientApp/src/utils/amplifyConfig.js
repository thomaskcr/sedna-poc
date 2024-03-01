import { Amplify, Auth } from 'aws-amplify';
import {COGNITO_REGION, COGNITO_USERPOOL_ID, COGNITO_APP_CLIENT_ID, COGNITO_DOMAIN, COGNITO_SIGN_IN_URL, COGNITO_SIGN_OUT_URL, COGNITO_PROVIDER} from "./amplifyConstants";


Amplify.configure({
    Auth: {
        region: COGNITO_REGION,
        userPoolId: COGNITO_USERPOOL_ID,
        userPoolWebClientId: COGNITO_APP_CLIENT_ID,
        oauth: {
            domain: COGNITO_DOMAIN,
            scope: ['openid', 'email', 'profile'],
            redirectSignIn: COGNITO_SIGN_IN_URL,
            redirectSignOut: COGNITO_SIGN_OUT_URL,
            responseType: 'code',
            clientId: COGNITO_APP_CLIENT_ID,
            options: {
                provider: COGNITO_PROVIDER
            }
        }
    }
});

export const amplifyConfig = Auth.configure();
