/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    AdminDeleteUserCommand,
    AdminConfirmSignUpCommand,
    AdminUpdateUserAttributesCommand,
    AdminGetUserCommand,
    ListUsersCommand,
    SignUpCommand,
    AdminCreateUserCommand,    
} from "@aws-sdk/client-cognito-identity-provider";


const CreateUser = async  (clientId,userpoolId, username, password, email) => {
    const client = new CognitoIdentityProviderClient({});    
    const signUpCommand = new SignUpCommand({
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: "email", Value: email },{ Name: "name", Value: email }],
        // SecretHash: process.env.COGNITO_SECRET
    });

    const signUpCommandInput = { 
        UserPoolId: userpoolId, 
        Username: username, 
        // SecretHash: process.env.COGNITO_SECRET,
    };
    const adminConfirmSignUpCommand = new AdminConfirmSignUpCommand(signUpCommandInput);

    const adminUpdateUserAttributesCommandInput = { 
        UserPoolId: userpoolId, 
        Username: username, 
        UserAttributes: [ 
        { 
            Name: "email_verified", 
            Value: "true",
        },
        ],
        // SecretHash: process.env.COGNITO_SECRET,
    };

    const adminUpdateUserAttributesCommand = new AdminUpdateUserAttributesCommand(adminUpdateUserAttributesCommandInput);


    await  client.send(signUpCommand);
    await  client.send(adminConfirmSignUpCommand);
    await  client.send(adminUpdateUserAttributesCommand);

    return;
};

const FindUser = (userPoolId, username ) => {
    const client = new CognitoIdentityProviderClient({});

    const command = new AdminGetUserCommand({
        UserPoolId: userPoolId,
        Username: username,
        // SecretHash: process.env.COGNITO_SECRET,
    });

    return client.send(command);
};

const ListUsers = (userPoolId) => {    
    const client = new CognitoIdentityProviderClient({});

    const command = new ListUsersCommand({
    UserPoolId: userPoolId,
    // SecretHash: process.env.COGNITO_SECRET,
    
    });

    return client.send(command);
}

const UpdateUser = () => {

}

const DeleteUser = async (userPoolId,username) => {
    const client = new CognitoIdentityProviderClient({});
    const input = { 
        UserPoolId: userPoolId, 
        Username: username, 
        // SecretHash: process.env.COGNITO_SECRET,
    };
    const command = new AdminDeleteUserCommand(input);    

    return await client.send(command);
}

export { CreateUser, FindUser, ListUsers, UpdateUser, DeleteUser };