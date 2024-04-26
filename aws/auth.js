import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    AdminUserGlobalSignOutCommand,
    AdminInitiateAuthCommand,
    RevokeTokenCommand,
    GlobalSignOutCommand
} from "@aws-sdk/client-cognito-identity-provider";

const SignIn = (username, password, clientId, userPoolId) => {
const client = new CognitoIdentityProviderClient({});
// const command = new AdminInitiateAuthCommand({
//     ClientId: clientId,
//     UserPoolId: userPoolId,
//     AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
//     AuthParameters: { USERNAME: username, PASSWORD: password },
// });

const command = new InitiateAuthCommand({
    ClientId: clientId,
    AuthParameters: { USERNAME: username, PASSWORD: password },
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
});


return client.send(command);
}

// const SignOut = (userPoolId,username) => {
const SignOut = (accessToken) => {
    const client = new CognitoIdentityProviderClient({});
    // const input = { 
    // UserPoolId: userPoolId, 
    // Username: username, 
    // };
    // const command = new AdminUserGlobalSignOutCommand(input);
    const input = {
        AccessToken: accessToken

    }
    const command = new GlobalSignOutCommand(input);
    return client.send(command);
}

const RefreshToken = (refreshToken,clientId,clientSecret) => {
    const client = new CognitoIdentityProviderClient({});
    const input = { 
    Token: refreshToken,
    ClientId: clientId, 
    // ClientSecret: clientSecret,
    };
    const command = new RevokeTokenCommand(input);
    return client.send(command);
}


export  { SignIn, SignOut, RefreshToken }