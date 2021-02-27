import constants from "../constants";

/**
 * Type for communicating with the backend's
 * collaborative session WebSockets API.
 */
class CollabSocket {
  /**
   * Open a new WebSocket connection to the backend. WebSocket will
   * provide an error if invalid ID is supplied.
   * 
   * @param {String} uid UUID of collaborative session to connect to.
   * @param {() => any} onOpen Fired on WebSocket open.
   * @param {() => any} onClose Fired on WebSocket close.
   * @param {(error: Error) => any} onError Fired on WebSocket error.
   * @param {Number} timeout Default timeout to use (in ms).
   * @returns {CollabSocket} New connection to the session.
   */
  constructor(uid, onOpen, onClose, onError = (() => null), timeout = 5000) {
    const url = `${constants.WEBSOCKET_URL}/collab/join/${uid}`
    let ws = WebSocket(url);
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onerror = onError;
    
    this.onMessage = () => {};
    ws.onmessage = this._onMessage(this.onMessage);
    this.timeout = timeout;
    this.ws = ws;
  }

  // Wraps onmessage calls with JSON.parse for usability.
  _onMessage() {
    return this.onMessage ? (m) => this.onMessage(JSON.parse(m)) : () => null;
  }

  /**
   * Writes to their own editor. Returns the new content of
   * editor if the write was accepted.
   * 
   * @param {String} value Value to update the current user's editor with.
   * @returns {Promise<String>} Result of write request.
   */
  sendWrite(value) {
    return new Promise(resolve => {
      setTimeout(() => {
        // TODO
      }, this.timeout);
    });
  }

  /**
   * Asks the backend to make a write to `target`'s
   * editor once. Returns the new content of said `target`'s
   * editor if the write was accepted.
   * 
   * @param {String} target UID of target editor.
   * @param {String} value Value to update the current user's editor with.
   * @returns {Promise<String>} Result of write request.
   */
  requestWrite(target, value) {
    return new Promise(resolve => {
      setTimeout(() => {
        // TODO
      }, this.timeout);
    });
  }
  
  /**
   * Asks the backend for permission to read `target`'s
   * editor once. Returns the content of said `target`'s
   * editor if read was accepted.
   * 
   * @param {String} target UID of target editor.
   * @returns {Promise<String>} Contents of the user's editor.
   */
  requestRead(target) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.ws.send(JSON.stringify({
          type: "READ",
          target,
        }));
        
        // Loop until we reach our timeout or resolve the
        // Promise.
        while (true) {
          this.onMessage = (m) => {
            if (m.type === "READ")
              resolve(m.content);
          }
        }
      }, this.timeout);

      reject("Failed to request read.");
    });
  }

  /**
   * Subscribe to all current and future changes in editor
   * `target`, if possible. All changes will be passed to
   * `onChange`.
   * 
   * @param {String} target Editor to subscribe to reads from.
   * @param {(data, value) => any} onChange Fired on change in `target`.
   * @returns {Promise<() => void>} Unsubscribes onChange handler.
   */
  subscribeRead(target, onChange) {
    return new Promise((resolve, reject) => {
      // TODO
    });
  }
}

export default CollabSocket;
