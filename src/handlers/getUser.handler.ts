import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { getUser } from '../repositories/user.repository';
import { GetUserInfoRequest, ResponseMessageData, User } from 'models';
import { createResponse } from '../utils';
import { StatusCode } from '../constants';

export default (
  req: GetUserInfoRequest,
  res: ServerResponse<IncomingMessage>,
): void => {
  const userId = req?.params?.userId;
  if (userId) {
    if (!validate(userId)) {
      createResponse<ResponseMessageData>(
        res,
        StatusCode.ClientErrorBadRequest,
        {
          message: 'Invalid user id',
        },
      );
    }
    const user = getUser(userId);
    if (user) {
      createResponse<User>(res, StatusCode.SuccessOK, user);
    }

    createResponse<ResponseMessageData>(res, StatusCode.ClientErrorNotFound, {
      message: 'User does not exist',
    });
  }
};
