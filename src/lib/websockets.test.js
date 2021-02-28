import { WEBSOCKET_URL } from '../constants';
import CollabSocket from './websockets';

describe("CollabSocket", () => {
  it("establishes a connection", () => {
    const goodConn = jest.fn();
    new CollabSocket("randomID", goodConn);
    expect(goodConn.mock.calls.length).toBe(1);
  });
});