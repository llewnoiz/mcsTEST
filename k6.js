import encoding from 'k6/encoding';
import http from 'k6/http';
import { check ,sleep} from 'k6';

const url = 'https://api.dev.amanocloud.co.kr';
const pathLogin = '/v1/auth/signin';
const pathCarLocation = '/v1/gid/cars/location';
const username = '12884';
const password = 'DkfrlDkfuq0070+';

export const options = {
    vus: 1000,
    duration: '30s',
};

export default function () {

const loginApi = `${url}${pathLogin}`;

let res = http.post(loginApi,{username,password});
const resJson = res.json();
const data = resJson.data;
console.log(data);

const carlocationApi = `${url}${pathCarLocation}`;
const resGidStr = JSON.stringify({
    plotId: '123',
    locList: 
        [
            {
                laneCode: '01B1000002',
                buildingNo: '01',
                createDate:'2024-04-20T17:30:34.000Z',
                carNo:'1111',
                parkingTime:'2024-04-30T17:41:12.000Z',
                carFile:'2',
                parkingAction:'LaneIn'
            }
        ]});
let resGid = http.post(carlocationApi,resGidStr, {
    headers: { 'Content-Type': 'application/json','authorization': `Bearer eyJraWQiOiJlaVNFWjZLNWlEYWdidUJlMlR4VGN6XC9jTkZ3c0RMRk84UUxcL1dSVUs0SG89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxY2Y5Mjc2Zi1hYjE2LTRiOTQtOTVmOS1mNjFmY2U2ZjA5NDEiLCJjb2duaXRvOmdyb3VwcyI6WyJhbWFub19wbG90Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMl84WEExcWRlUzgiLCJjbGllbnRfaWQiOiJzYzE5YzYzMHByYTJrcjFmcTJ2ajYzNWViIiwib3JpZ2luX2p0aSI6IjEzMjRjYjI1LTAxYzQtNDg1YS1iNDM4LTZkYTlhN2FmY2NiOSIsImV2ZW50X2lkIjoiMTFhNWJiNWEtNDU5Yi00YzAxLWE1MDEtMGEyNWMyOGU4ZWNmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcxNDExOTY4MiwiZXhwIjoxNzE0MTIzMjgyLCJpYXQiOjE3MTQxMTk2ODIsImp0aSI6IjJhZDMzMDJlLTAyNDYtNDhjNC1iNTViLTM2MGRlNWI0MmYwMSIsInVzZXJuYW1lIjoiMTI4ODQifQ.EH4Pmi0atie_ty9MZeZVnMxraSNXPGgZ2e0cS4huTn0T_7vnEu20EMUWtVT58yGVK-r_nDyBwftFCJavi2gIIabwp3lafx0ZeO-Hp6Qv9swxOcnLNJLINTZUjEUM7W1wnYzq2Q7e-Gu1NKgcBjoOn2Y2qyc1O1f7aqjIVSxDkhl2Ok0xdg6ngo6R-gpH6RWSSxHBDWY2ggO1aGl0gexBz8N19vy6vprrumX4kFcuuBIS59pbPMowwE9NxR02EdW8ML7GsR0R7dAF10Hc8PEeY7G7bokN3lu42usMMRPe2YOks2jDM2OHUOiKKElM_xcRFXxpLo75gNfJOuKDCDBW4w` },
});

const resGidJson = resGid.json();
const dataGid = resGidJson;
console.log(dataGid);
sleep(500);
}

// cat k6.js | docker run --rm -i grafana/k6 run --vus 10 --duration 30s -