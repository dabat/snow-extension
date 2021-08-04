import { MessageTypes } from './constants';

// Popup or content script requesting the current status
interface SnowStatusRequest {
  type: MessageTypes.SnowStatusRequest;
}

// Background script broadcasting current status
export interface SnowStatus {
  type: MessageTypes.SnowStatus;
  snowing: boolean;
}

// Popup requesting background script for status change
interface SnowToggle {
  type: MessageTypes.SnowToggle;
  snow: boolean;
}

export type MessageType = SnowStatusRequest | SnowStatus | SnowToggle;
