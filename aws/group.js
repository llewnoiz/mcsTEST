import { CognitoIdentityProviderClient,
    CreateGroupCommand,DeleteGroupCommand,ListGroupsCommand,GetGroupCommand,UpdateGroupCommand, AdminAddUserToGroupCommand, ListUsersInGroupCommand, AdminRemoveUserFromGroupCommand
 } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

const CreateGroup = async  (groupName,userpoolId ) => {
    const client = new CognitoIdentityProviderClient({});
    const input = {
    GroupName: groupName,
    UserPoolId: userpoolId, 
    // Description: "STRING_VALUE",
    // RoleArn: "STRING_VALUE",
    // Precedence: Number("int"),
    };
    const command = new CreateGroupCommand(input);
    return await client.send(command);    
    ;
};

const FindGroup= async (groupName, userPoolId ) => {
    const client = new CognitoIdentityProviderClient({});
    const input = { // GetGroupRequest
    GroupName: groupName, // required
    UserPoolId: userPoolId, // required
    };
    const command = new GetGroupCommand(input);
    return await client.send(command);
};

const ListGroup = async (userPoolId) => {    
    const client = new CognitoIdentityProviderClient({});
    const input = { 
    UserPoolId: userPoolId, 
    // Limit: Number("int"),
    // NextToken: "STRING_VALUE",
    };
    const command = new ListGroupsCommand(input);
    return await client.send(command);
}

const UpdateGroup = async (groupName,userPoolId) => {
    const client = new CognitoIdentityProviderClient({});
    const input = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    // Description: "STRING_VALUE",
    // RoleArn: "STRING_VALUE",
    // Precedence: Number("int"),
    };
    const command = new UpdateGroupCommand(input);
    return await client.send(command);
}

const DeleteGroup = async (groupName,userPoolId) => {
    const client = new CognitoIdentityProviderClient({});
    const input = { 
        GroupName: groupName, 
        UserPoolId: userPoolId,
    };
    const command = new DeleteGroupCommand(input);
    return await client.send(command);
}

const AddUsertoGroup = async (userPoolId,username,groupName) => {
    const client = new CognitoIdentityProviderClient({});
    const input = { // AdminAddUserToGroupRequest
        UserPoolId: userPoolId, // required
        Username: username, // required
        GroupName: groupName, // required
    };
    const command = new AdminAddUserToGroupCommand(input);
    return await client.send(command);
}

const ListUserInGroup = async (userPoolId,username,groupName) => {
    const client = new CognitoIdentityProviderClient({});
    const input = { // ListUsersInGroupRequest
    UserPoolId: userPoolId,
    GroupName: groupName,
    // Limit: Number("int"),
    // NextToken: "STRING_VALUE",
    };
    const command = new ListUsersInGroupCommand(input);
    return await client.send(command);
}

const RemoveUserInGroup = async (userPoolId,username,groupName) => {
    const client = new CognitoIdentityProviderClient({});
    const input = {
        UserPoolId: userPoolId,
        Username: username,
        GroupName: groupName,
    };
    const command = new AdminRemoveUserFromGroupCommand(input);
    return await client.send(command);
}



export { CreateGroup, FindGroup, ListGroup, UpdateGroup, DeleteGroup, AddUsertoGroup, ListUserInGroup, RemoveUserInGroup };