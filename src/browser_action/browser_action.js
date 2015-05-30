// When the popup HTML has loaded
// window.addEventListener('load', function(evt) {
//     console.log('loaded');
//     chrome.storage.get('foobar', function(data) {
//         console.log('data', data);
//     });

// });

function setDOMInfo(info) {
    $('.profile__details h1').text(info.name);
    $('#avatar').attr('src', info.image);

    console.log('setDOMInfo', info);
}


window.addEventListener('DOMContentLoaded', function() {
    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'getInfo'}, setDOMInfo);
    });
});