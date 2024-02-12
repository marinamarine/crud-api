import { ServerResponse } from 'http';
import { getUsers } from '../repositories/user.repository';
import { GetUserInfoRequest } from 'models';

export default (_req: GetUserInfoRequest, res: ServerResponse): void => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(getUsers()));
};
