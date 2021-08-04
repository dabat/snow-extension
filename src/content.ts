import './content.css';
import { MessageType } from './types';
import { MessageTypes } from './constants';

const body = document.getElementsByTagName('body');
const snowflakesContainer = document.createElement('div');
snowflakesContainer.className = 'snowflakes';
snowflakesContainer.setAttribute('aria-hidden', 'true');
const snowflake = document.createElement('div');
snowflake.className = 'snowflake';
snowflake.textContent = '❄';

for (let index = 0; index < 12; index++) {
  snowflakesContainer.appendChild(snowflake.cloneNode(true));
}

let snowing = false;

chrome.runtime.sendMessage({ type: MessageTypes.SnowStatusRequest });

chrome.runtime.onMessage.addListener((message: MessageType) => {
  if (message.type === MessageTypes.SnowStatus) {
    if (message.snowing) {
      if (!snowing) {
        body[0]?.prepend(snowflakesContainer);
      }
    } else {
      snowflakesContainer.parentNode?.removeChild(snowflakesContainer);
    }
    snowing = message.snowing;
  }
});
