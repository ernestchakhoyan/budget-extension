$(function () {
    $("#saveLimit").click(function () {
        const limit = $("#limit").val();
        if(limit){
            chrome.storage.sync.set({"limit": limit}, function () {
                close();
            })
        }
    });

    $("#resetTotal").click(function () {
        chrome.storage.sync.set({"total": 0}, function () {
            const notificationObject = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Total reset!",
                message: "Total has been reset!"
            };

            chrome.notifications.create("resetNotification", notificationObject)
        })
    })
});