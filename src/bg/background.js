chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.signal) {
        // Save it using the Chrome extension storage API.
        chrome.browserAction.setBadgeText({text:request.signal})
    } else {
        chrome.browserAction.setBadgeText();
    }

});



chrome.runtime.onMessage.addListener(function(msg, sender) {
    /* First, validate the message's structure */
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        /* Enable the page-action for the requesting tab */
        chrome.pageAction.show(sender.tab.id);
    }
});