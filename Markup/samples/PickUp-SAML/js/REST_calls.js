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


var driverRequest;

$.getJSON( "./mocks/shareRequestData.json", function( data ) {
    driverRequest = $.parseJSON(JSON.stringify(data, null, 4));
});

function shareRide(){

    var request = $.ajax({
        url: "/restful/testbackend",
        method: "GET",
        data: driverRequest,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function( xhr ) {
            xhr.setRequestHeader('Authorization', 'Bearer');
            var jsonStr = JSON.stringify(driverRequest, null, 4);
            $("#timeline-content .sending").show("slow");
            $("#timeline-content .sent").show();
            $("#timeline-content .sent code.copy-target1").html(jsonStr);
            $('.code-container pre code').each(function(i, e) {hljs.highlightBlock(e)});
            $("#timeline-content .received").hide();
            $(".loading-icon").show();
        }
    });

    request.done(function( msg ) {
        var jsonStr = JSON.stringify(msg, null, 4);
        $("#timeline-content .received code.copy-target3").html(jsonStr);
        $('.code-container pre code').each(function(i, e) {hljs.highlightBlock(e)});
        $("#timeline-content .received").show("slow");
        $("#timeline-content .sending").hide();

        $(".loading-icon").hide();
        $('.nav-tabs a[href="#nav-rides"]').tab('show');
        $('.no-rides-msg').hide();
        $('.rides').show();
        $('<div class="alert alert-success">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button> You have successfully shared your ride.&nbsp;&nbsp; </div>').hide().appendTo('#response').fadeIn(300);

        $(".app-home .alert").delay(3000).fadeOut( "normal", function(){
            $(this).remove();
        });
    });

    request.fail(function( jqXHR, textStatus ) {
        $(".request-response-details").append( "No data... " + textStatus);
    });
}


$(".share").on("click",function(){
    shareRide();
});



