import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { updateUser } from '../repositories/user.repository';
import { GetUserInfoRequest, ResponseMessageData, User } from '../models';
import { handleResponse } from '../utils';
import { StatusCode } from '../constants';

export default (
  req: GetUserInfoRequest,
  res: ServerResponse<IncomingMessage>,
): void => {
  const userId = req?.params?.userId;
  if (userId) {
    if (!validate(userId)) {
      handleResponse<ResponseMessageData>(
        res,
        StatusCode.ClientErrorBadRequest,
        {
          message: 'Invalid user id',
        },
      );
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      const user = updateUser(userId, data);

      if (user) {
        handleResponse<User>(res, StatusCode.SuccessOK, user);
      } else {
        handleResponse<ResponseMessageData>(
          res,
          StatusCode.ClientErrorNotFound,
          {
            message: 'User does not exist',
          },
        );
      }
    });
  }
};
