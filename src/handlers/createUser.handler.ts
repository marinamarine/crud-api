import { ServerResponse } from 'http';
import { createUser } from '../repositories/user.repository';
import { GetUserInfoRequest, ResponseMessageData, User } from '../models';
import { handleResponse } from '../utils';
import { StatusCode } from '../constants';

export default (req: GetUserInfoRequest, res: ServerResponse): void => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = JSON.parse(body);
    if (validateUserData(data)) {
      const newUser = createUser(data);
      handleResponse<User>(res, StatusCode.SuccessCreated, newUser);
    } else {
      handleResponse<ResponseMessageData>(res, StatusCode.ClientErrorNotFound, {
        message: 'Incorrect data',
      });
    }
  });
};

const validateUserData = (user: Omit<User, 'id'>) => {
  if (user?.age <= 0) {
    return false;
  }
  if (!user?.username) {
    return false;
  }
  if (!user?.hobbies) {
    return false;
  }
  return true;
};
