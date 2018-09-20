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

var validateTokenResponse;
var tokenResponse;
var apiResponse;

$.getJSON("/restful/getTokenbackend", function(response) {
    tokenResponse = response;
});

$.getJSON("/restful/shareRideBackend", function(response) {
    apiResponse = response;
});

$.getJSON("/restful/validateTokenBackend", function(response) {
    validateTokenResponse = response;
});

var apiRequest = {
    "access_token": "jkt45e-32nl-lpq2-dk31",
    "passenger": "John",
}

var $timeline = $("#timeline-content");
var $codeContainer = $('.code-container pre code');
var $loader = $(".loading-icon");

function shareRideGetToken(){
    var response = $.ajax({
        url: "/restful/getTokenbackend",
        method: "GET",
        data: tokenResponse,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function( xhr ) {
            xhr.setRequestHeader('Authorization', 'Bearer');
            var curl = "curl -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H '" +
                "Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials' " +
                "https://localhost:9443/oauth2/token";
            $(".event1-sent",  $timeline).show();
            $(".event1-sending",  $timeline).show("slow");
            $(".event1-sent code.copy-target1",  $timeline).html(curl);
            codeHighlight();
            $loader.show();
        }
    });
    response.done(function( res ) {
        var jsonStr = JSON.stringify(res, null, 4);
        $(".event1-received code.copy-target3", $timeline).html(jsonStr);
        codeHighlight();
        $(".event1-sending",  $timeline).hide();
        $(".event1-received", $timeline).show("slow");
        shareRideAPIRequest();
    });
    response.fail(function( jqXHR, textStatus ) {
        $(".event1-received .request-response-details").append( "No data... " + textStatus);
        hideActions();
    });
}

function shareRideValidateToken() {
    var response = $.ajax({
        url: "/restful/validateTokenBackend",
        method: "GET",
        data: validateTokenResponse,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function( xhr ) {
            xhr.setRequestHeader('Authorization', 'Bearer');
            var curl = "curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data " +
                "'token=fbc4e794-23db-3394-b1e5-f2c3e511d01f' https://localhost:9443/oauth2/introspect";
            $(".event2-sent",  $timeline).show();
            $(".event2-sending",  $timeline).show("slow");
            $(".event2-sent code.copy-target1",  $timeline).html(curl);
            codeHighlight();
            $(".event3-sending",  $timeline).hide();
        }
    });
    response.done(function( res ) {
        var jsonStr = JSON.stringify(res, null, 4);
        $(".event2-received code.copy-target3", $timeline).html(jsonStr);
        codeHighlight();
        $(".event2-received", $timeline).show("slow");
        $(".event2-sending",  $timeline).hide();
        getAPIResponse();
    });
    response.fail(function( jqXHR, textStatus ) {
        $(".event2-received request-response-details").append( "No data... " + textStatus);
        hideActions();
    });
}

function shareRideAPIRequest() {
    var request = $.ajax({
        url: "/restful/shareRideBackend",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function( xhr ) {
            xhr.setRequestHeader('Authorization', 'Bearer');
            var jsonStr = JSON.stringify(apiRequest, null, 4);
            $(".event3-sent",  $timeline).show();
            $(".event3-sending",  $timeline).show("slow");
            $(".event3-sent code.copy-target1",  $timeline).html(jsonStr);
            codeHighlight();
        }
    });
    request.done(function( res ) {
        shareRideValidateToken();
    });
    request.fail(function( jqXHR, textStatus ) {
        $(".event3-received request-response-details").append( "No data... " + textStatus);
        hideActions();
    });
}

function getAPIResponse() {
    var request = $.ajax({
        url: "/restful/shareRideBackend",
        method: "GET",
        data: apiResponse,
        dataType: "json",
        contentType: "application/json",
    });
    request.done(function( res ) {
        var jsonStr = JSON.stringify(res, null, 4);
        $(".event3-received code.copy-target3", $timeline).html(jsonStr);
        codeHighlight();
        $(".event3-received", $timeline).show("fast");
        $loader.hide();
        $('.action-response.success').show();
    });
    request.fail(function( jqXHR, textStatus ) {
        $(".event3-received request-response-details").append( "No data... " + textStatus);
        hideActions();
    });
}

function codeHighlight() {
    $codeContainer.each(function(i, e) {hljs.highlightBlock(e)});
}

function hideActions() {
    $loader.hide();
    $(".sending").hide();
    $('.action-response.error').show();
}

$(".share").on("click",function(){
    $('.action-response').hide();
    shareRideGetToken();
});



