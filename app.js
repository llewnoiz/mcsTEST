import { 
    CreateUser, FindUser, ListUsers, UpdateUser, DeleteUser,
    SignIn, SignOut, RefreshToken, CreateGroup, DeleteGroup, ListGroup, FindGroup, UpdateGroup, AddUsertoGroup, ListUserInGroup, RemoveUserInGroup
} from './aws/index.js';
import {
    connection
} from './db.js';

import *as fs from 'fs';

const qryPlot = async () => {
    try {
        const [results, fields] = await connection.query(
            'SELECT site_id from view_site_info WHERE site_name LIKE "%[통합]" AND enabled = 1'
        );
        return results;        
    } catch (err) {
        console.log(err);
        return [];
    }
}
const deleteAllUser = async (users) => {
    

    for(let i=0;i<users.length;i++) {
        try {
            await DeleteUser(process.env.COGNITO_USER_POOL,users[i].name);
        } catch (error) {
            
        } finally {
            // await wait(500);
        }

    }
}

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

const mcsUserInitRegister = async () =>{
    console.profile("mcsUserInitRegister()");
    console.timeStamp("mcsUserInitRegister()");
    let group = null;
    const groupName = 'amano_plot';
    const password = 'DkfrlDkfuq0070+'; // AmaNo123!

    console.log('environments');
    console.log({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    const acrmUsers = await qryPlot();
    console.log(`acrmUsers Count: ${acrmUsers?.length}`);
    
    let first = 0;
    const mscUser = acrmUsers?.map((el)=> {
        const user = {
            "group": groupName,
            "name": el?.site_id,
            "password": password,
            "email": `${el?.site_id}@amacloud.co.kr`
        };

        if(Boolean(process.env.USER_FILES_CREATE)) {
            const txt = !first ? `${JSON.stringify(user)}\n` : `,${JSON.stringify(user)}\n`
            first = 1;
            fs.appendFile('./users.txt', txt, err => {
            if (err) {
                console.error(err);
            } else {
                console.log(txt);
            }
            });
        }
        
        
        return user 
    });

    deleteAllUser(mscUser);

    try {
        group = await FindGroup(groupName,process.env.COGNITO_USER_POOL);        
    } catch (error) {
        console.log(error);
    }

    if(!group) {
        console.log('NOT FOUND GROUP');
        group = await CreateGroup(groupName,process.env.COGNITO_USER_POOL);
        console.log('---------------- Create Group ---------------- ');        
    }

    for(let i=0;i<mscUser.length;i++) {
        
        const user = mscUser[i];
        
        try {
            const userinfo = await FindUser(process.env.COGNITO_USER_POOL,user.name);            
        } catch (error) {            
        }

        try {
            console.log('NOT FOUND User');
            const createdUser =  await CreateUser(process.env.COGNITO_USER_CLIENT,process.env.COGNITO_USER_POOL,user.name,user.password,user.email);                            
        } catch (error) {            
        }
        
        const groupUser = await AddUsertoGroup(process.env.COGNITO_USER_POOL,user.name,groupName);
        console.profileEnd("mcsUserInitRegister()");
    }
}

mcsUserInitRegister();