console.log("From content");

document.querySelector('body').addEventListener('mouseover', (event) => {
    if (event.target.nodeName === 'IMG') {
        console.log(event.target.getAttribute('src'));
        chrome.runtime.sendMessage({message: event.target.getAttribute('src')})
    }
})

