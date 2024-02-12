import { ServerResponse } from 'http';
import { createUser } from '../repositories/user.repository';
import { GetUserInfoRequest, User } from 'models';

export default (req: GetUserInfoRequest, res: ServerResponse): void => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = JSON.parse(body);
    if (validateUserData(data)) {
      const newUser = createUser(data);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ...newUser }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Incorrect data' }));
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
  if (!user?.hobbies || !user.hobbies.length) {
    return false;
  }
  return true;
};
