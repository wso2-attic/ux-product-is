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

$(document).ready(function () {

    var $noRideMsg = $('.no-rides-msg');
    var $vehicleContainer = $('.vehicle-select-container');
    var $actionResponse = $('.action-response');
    var $rides = $('.rides');
    var $selectVehicle = $('.select');
    var $continueBook = $('.continue');
    var $bookContainer = $('.book-container');

    $rides.hide();

    $('.book-btn').on('click', function(){
        $bookContainer.hide();
        $vehicleContainer.show();
        $continueBook.addClass('disabled');
        $selectVehicle.removeClass('active');
        $rides.hide();
        $actionResponse.hide();
        $noRideMsg.show();
    });
    
    $continueBook.on('click', function(){
        $('.nav-tabs a[href="#nav-rides"]').tab('show');
        $noRideMsg.hide();
        $rides.show();
        $actionResponse.hide();
    });

    $('#nav-book-tab').on('click', function(){
        $vehicleContainer.hide();
        $bookContainer.show();
    });
    
    $('.cancel').on('click', function(){
        $rides.hide();
        $actionResponse.hide();
        $noRideMsg.show();
    });

    $selectVehicle.click(function() {
        $continueBook.removeClass('disabled');
        $selectVehicle.removeClass('active');
        $(this).addClass('active');
    });
});

