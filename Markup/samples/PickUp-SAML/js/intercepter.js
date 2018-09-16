/*
 ~   Copyright (c) 2018 WSO2 Inc. (http://wso2.com) All Rights Reserved.
 ~
 ~   Licensed under the Apache License, Version 2.0 (the "License");
 ~   you may not use this file except in compliance with the License.
 ~   You may obtain a copy of the License at
 ~
 ~        http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~   Unless required by applicable law or agreed to in writing, software
 ~   distributed under the License is distributed on an "AS IS" BASIS,
 ~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~   See the License for the specific language governing permissions and
 ~   limitations under the License.
 */

var validateTokenResponse= {
    "exp":1464161608,
    "username":"john@carbon.super",
    "active":true,
    "token_type":"Bearer",
    "client_id":"rgfKVdnMQnJSSr_pKFTxj3apiwYa",
    "iat":1464158008
};

var tokenResponse = {
    "token_type":"Bearer",
    "expires_in":3600,
    "access_token":"fbc4e794-23db-3394-b1e5-f2c3e511d01f"
};

var apiResponse = {
    "success":true,
    "status_code": 200
}

$.mockjax({
    url: "/restful/getTokenbackend",
    status: 210,
    responseTime: 5000,
    responseText: tokenResponse
});

$.mockjax({
    url: "/restful/shareRideBackend",
    status: 210,
    responseTime: 5000,
    responseText: apiResponse
});

$.mockjax({
    url: "/restful/validateTokenBackend",
    status: 210,
    responseTime: 5000,
    responseText: validateTokenResponse
});

