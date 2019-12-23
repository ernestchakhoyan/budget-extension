var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": [ "selection" ]
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value)
}

chrome.contextMenus.onClicked.addListener(function (clickedData) {
    if (clickedData.menuItemId === "spendMoney" && clickedData.selectionText) {
        if (isInt(clickedData.selectionText)) {
            chrome.storage.sync.get([ "total", "limit" ], function (budget) {
                var newTotal = 0;

                if(budget.total){
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickedData.selectionText);
                chrome.storage.sync.set({ "total": newTotal}, function () {
                    if(newTotal >= budget.limit){
                        const notificationObject = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit reached!",
                            message: "Uh oh! Looks like you've reached your limit!"
                        };

                        chrome.notifications.create("limitNotification", notificationObject)
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()})
});