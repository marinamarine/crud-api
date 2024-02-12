import { IncomingMessage, ServerResponse } from 'http';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: [string];
}

export interface RouteHandler {
  (req: GetUserInfoRequest, res: ServerResponse): void;
}

export interface RouteParams {
  [key: string]: string;
}

export interface GetUserInfoRequest extends IncomingMessage {
  params?: RouteParams;
}

export interface ResponseMessageData {
  message: string;
}
