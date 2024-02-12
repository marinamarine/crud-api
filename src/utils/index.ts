import { IncomingMessage, ServerResponse } from 'http';
import { StatusCode } from '../constants';

export const createResponse = <T>(
  res: ServerResponse<IncomingMessage>,
  statusCode: StatusCode,
  data: T,
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};
