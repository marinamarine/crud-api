import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { deleteUser } from '../repositories/user.repository';
import { GetUserInfoRequest, ResponseMessageData } from '../models';
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
    const result = deleteUser(userId);
    if (result) {
      handleResponse<ResponseMessageData>(res, StatusCode.SuccessOK, {
        message: 'User deleted successfully',
      });
    } else {
      handleResponse<ResponseMessageData>(res, StatusCode.ClientErrorNotFound, {
        message: 'User does not exist',
      });
    }
  }
};
