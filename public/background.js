// Go to chrome://extensions/
// Enable Developer mode
// Load unpacked & choose file
// Click on 'Inspect views background page to see log of background.js
// This background script is run when extension is installed / run / refreshed

// var tabOpened = false;

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.executeScript(null, {file: 'foreground.js'}, () => console.log("Injected foreground"));
})

chrome.browserAction.onClicked.addListener(tab => {
    // if (!tabOpened) {
        chrome.windows.create({ 
            url: chrome.runtime.getURL('index.html'), 
            type: "popup", 
            width: 320, 
            height: 119 
        })
        // , (window) => {
        //     tabOpened = true;
        //     windows.onRemoved.addListener(window => {
        //         tabOpened = false;
        //     })
        // }
        // });
    // }
});



