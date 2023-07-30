'use client';
import React from "react";
import JmsWebsocket from "./ws";
import { User, WebsocketPublish, WebsocketRpcRequest, WebsocketRpcResponse } from "../ws-schema";

export type WebsocketContextT = {
  // call: <Path extends WebsocketRpcRequest["path"]>
  //        (path: Path, args: Extract<WebsocketRpcRequest, { path: Path }>["data"]) => Promise<Extract<WebsocketRpcResponse, { path: Path }>["data"]>,
  // subscribe: <Path extends WebsocketPublish["path"]>
  //             (path: Path, fn: (data: Extract<WebsocketPublish, { path: Path }>["data"]) => void) => string,
  // unsubscribe: (paths: string[]) => void,
  ws: JmsWebsocket,
  connected: boolean,
  user: User | null
};

export const WebsocketContext = React.createContext<WebsocketContextT>(
  // @ts-ignore
  null
);

export class WebsocketManagerComponent extends React.Component<{ children: React.ReactElement }, WebsocketContextT> {
  socket: JmsWebsocket = new JmsWebsocket();
  handles: string[] = [];

  readonly state: WebsocketContextT = {
    // call: this.socket.call as any,
    // subscribe: this.socket.subscribe as any,
    // unsubscribe: this.socket.removeHandles,
    ws: this.socket,
    connected: false,
    user: null
  };

  componentDidMount = () => {
    this.socket.connect("ws://" + window.location.hostname + ":9000");
    this.handles = [
      this.socket.onConnectChange(connected => this.setState({ connected })),
      this.socket.onLogin(user => this.setState({ user }))
    ]
  }

  componentWillUnmount = () => {
    this.socket.close();
  }

  render() {
    return <WebsocketContext.Provider value={this.state}>
      { this.props.children }
    </WebsocketContext.Provider>
  }
};

export abstract class WebsocketComponent<P={},S={}> extends React.Component<P,S> {
  static contextType = WebsocketContext;
  context!: WebsocketContextT;

  handles: string[] = [];

  subscribe = <Path extends WebsocketPublish["path"], K extends keyof S & Extract<WebsocketPublish, { path: Path }>["data"]>
          (path: Path, key: K) => 
  {
    const fn = (data: Extract<WebsocketPublish, { path: Path }>["data"]) => {
      this.setState({ [key]: data } as Pick<S, K>)
    };
    return this.subscribeFn<Path>(path, fn as any);
  }
  
  subscribeFn = <Path extends WebsocketPublish["path"]>
              (path: Path, fn: (data: Extract<WebsocketPublish, { path: Path }>["data"]) => void) => 
  {
    let callback_id = this.context.ws.subscribe<Path>(path, fn as any);
    this.handles.push(callback_id);
    return callback_id;
  }

  call = <Path extends WebsocketRpcRequest["path"]>
         (path: Path, args: Extract<WebsocketRpcRequest, { path: Path }>["data"]): Promise<Extract<WebsocketRpcResponse, { path: Path }>["data"]> => 
  {
    return this.context.ws.call<Path>(path, args as any) as any;
  }

  login = (username: string, password: string) => this.context.ws.login(username, password);
  logout = () => this.context.ws.logout();

  isConnected = () => this.context.connected;

  user = () => this.context.user;

  componentWillUnmount = () => {
    this.context.ws.removeHandles(this.handles);
  };
}