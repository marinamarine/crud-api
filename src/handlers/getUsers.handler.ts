import { ServerResponse } from 'http';
import { getUsers } from '../repositories/user.repository';
import { GetUserInfoRequest, User } from '../models';
import { StatusCode } from '../constants';
import { handleResponse } from '../utils';

export default (_req: GetUserInfoRequest, res: ServerResponse): void => {
  handleResponse<User[]>(res, StatusCode.SuccessOK, getUsers());
};
