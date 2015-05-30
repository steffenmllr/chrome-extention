chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var bkg = chrome.extension.getBackgroundPage();
    if(request.type === 'xing') {
        bkg.console.log(request.data);
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set(request.data);
    }

});