/*!
 * ASP.NET SignalR JavaScript Library v2.3.0-rtm
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js"/*tpa=https://www.howkteam.vn/signalr/jquery.signalR.js*/ />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        // Use the actual user-provided callback as the "identity" value for the registration.
                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue), memberValue);
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['discussHub'] = this.createHubProxy('discussHub'); 
        proxies['discussHub'].client = { };
        proxies['discussHub'].server = {
        };

        proxies['messageHub'] = this.createHubProxy('messageHub'); 
        proxies['messageHub'].client = { };
        proxies['messageHub'].server = {
            createChatMessage: function (mess) {
                return proxies['messageHub'].invoke.apply(proxies['messageHub'], $.merge(["CreateChatMessage"], $.makeArray(arguments)));
             },

            endChatGroup: function (groupId) {
                return proxies['messageHub'].invoke.apply(proxies['messageHub'], $.merge(["EndChatGroup"], $.makeArray(arguments)));
             },

            pushNewestQuestion: function (ques) {
                return proxies['messageHub'].invoke.apply(proxies['messageHub'], $.merge(["PushNewestQuestion"], $.makeArray(arguments)));
             }
        };

        proxies['notificationHub'] = this.createHubProxy('notificationHub'); 
        proxies['notificationHub'].client = { };
        proxies['notificationHub'].server = {
        };

        proxies['voteHub'] = this.createHubProxy('voteHub'); 
        proxies['voteHub'].client = { };
        proxies['voteHub'].server = {
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));