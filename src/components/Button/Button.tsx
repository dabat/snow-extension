import * as React from 'react';
import './Button.css';
import { MessageType } from '../../types';
import { MessageTypes } from '../../constants';

export const Button = () => {
  const [snowing, setSnowing] = React.useState(false);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageTypes.SnowStatusRequest });
    chrome.runtime.onMessage.addListener((message: MessageType) => {
      if (message.type === MessageTypes.SnowStatus) {
        setSnowing(message.snowing);
      }
    });
  }, []);

  const onClick = () => {
    chrome.runtime.sendMessage({
      type: MessageTypes.SnowToggle,
      snow: !snowing,
    });
  };

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={onClick}>
        {snowing ? 'Stop snowing 🥶' : 'Let it snow! ❄️'}
      </button>
    </div>
  );
};
