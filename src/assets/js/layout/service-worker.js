self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }

    //console.log('Notification Received:');
    //console.log(data);

    var title = data.title;
    var message = data.message;
    var icon = data.icon;
    var dataObj = {
        url: data.url
    };

    event.waitUntil(self.registration.showNotification(title, {
        body: message,
        icon: icon,
        data: dataObj
    }));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    var url = event.notification.data.url;
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});