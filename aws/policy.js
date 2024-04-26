import { DynamoDBClient,DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand ,DeleteCommand,PutCommand,DynamoDBDocument,UpdateCommand  } from "@aws-sdk/lib-dynamodb";


const CreateRole = async (tableName,groupName,policy) => {

    console.log(tableName,groupName,policy);
    await ddbDocClient.send(
        new PutCommand({           
            TableName: tableName, 
            Item: {
                group: groupName,
                policy,
            }}),        
        );
}
const FindRole = async (tableName,groupName) => {
    
    const response = await ddbDocClient.get({
        TableName: tableName,
        Key: {
            group: groupName
        }
    });
    console.log(response.Item?.policy);
    return response.Item?.policy;
}
const ListRole = async (tableName) => {
    const command = new ScanCommand ({
        TableName: tableName,
    });
    const response = await ddbDocClient.send(command);
    console.log(response);
    return response;
}
const UpdateRole = async (groupName, Resource) => {
    try {      
        const data = await this.ddbDocClient.send(new UpdateCommand({
            TableName: this.config.dynamodb.tables.name, 
            Key: {
              group: groupName
            },
            UpdateExpression: "set #policy.#statement[0].#resource = :newPolicy",    
            ExpressionAttributeNames: {
              "#policy":"policy",            
              "#statement":"Statement",            
              "#resource":"Resource",   
            },   
            ExpressionAttributeValues: {
              ":newPolicy": Resource?.policy
            },
            ReturnValues: "ALL_NEW" // 업데이트된 항목 반환
          }));
        return data?.Attributes;
      } catch (error) {
        return error;
      }  
}
const DeleteRole = async (tableName,groupName) => {
    const command = new DeleteCommand ({
        TableName: tableName,
        Key: {
            group: groupName
        }
    });
    const response = await ddbDocClient.send(command);
    // console.log(response);
    return response;
}

export {CreateRole, FindRole, ListRole, UpdateRole, DeleteRole,}