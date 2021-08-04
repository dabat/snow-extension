import { MessageType, SnowStatus } from './types';
import { MessageTypes } from './constants';

const sendSnowStatus = (snowing: boolean) => {
  const message: SnowStatus = {
    type: MessageTypes.SnowStatus,
    snowing: snowing,
  };

  // send message to the popup
  chrome.runtime.sendMessage(message);

  // send message to all tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

let snowing = false;

// Get locally stored value
chrome.storage.local.get('snowing', (response) => {
  snowing = response['snowing'] ? true : false;
});

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case MessageTypes.SnowStatusRequest:
      sendSnowStatus(snowing);
      break;

    case MessageTypes.SnowToggle:
      snowing = message.snow;
      chrome.storage.local.set({ snowing: snowing });
      sendSnowStatus(snowing);
      break;

    default:
      break;
  }
});
