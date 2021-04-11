// Go to chrome://extensions/
// Enable Developer mode
// Load unpacked & choose file
// Click on 'Inspect views background page to see log of background.js
// This background script is run when extension is installed / run / refreshed

let prevTabId = 0;

chrome.tabs.onActivated.addListener(tab => {
    if (tab.tabId === prevTabId) {
        chrome.runtime.reload();
    }
    prevTabId = tab.tabId;
//     console.log(tab);
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//         activeTabId = tab.tabId;
//         console.log(current_tab_info.url);
    chrome.tabs.executeScript(null, {file: 'foreground.js'}, () => console.log("Injected foreground"));
//     })
})


// Listener for messages coming from foreground
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     // Sending (not responding) message from background, 
//     // 1st parameter: tab id (you need it)
//     // 2nd parameter: the message
//     chrome.tabs.sendMessage(activeTabId, {message: "I got your message, sent from background"});
//     if (request.message === "Check the storage!") {
//         chrome.storage.local.get("id", value => console.log(value))
//         sendResponse({message: "I got your message!"});
//     }
// })





