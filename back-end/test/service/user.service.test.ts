import userService from '../../service/user.service';
import userDB from '../../repository/user.db';
import { User } from '../../model/user';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';
import { AuthenticationResponse } from '../../types';

jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

describe('User Service', () => {
  const mockUser = new User({
    id: 1,
    username: 'jdoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'hashedpass',
    role: 'teacher',
  });

  it('given username exists, when getUserByUsername is called, then returns user', async () => {
    (userDB.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);

    const user = await userService.getUserByUsername({ username: 'jdoe' });
    expect(user.username).toBe('jdoe');
  });

  it('given correct password, when authenticate is called, then returns JWT', async () => {
    (userDB.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateJwtToken as jest.Mock).mockReturnValue('fakeToken');

    const auth: AuthenticationResponse = await userService.authenticate({ username: 'jdoe', password: 'pass' });
    expect(auth.token).toBe('fakeToken');
    expect(auth.username).toBe('jdoe');
    expect(auth.role).toBe('teacher');
  });

  it('given new user, when createUser is called, then creates user', async () => {
    (userDB.getUserByUsername as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpass');
    (userDB.createUser as jest.Mock).mockResolvedValue(mockUser);

    const user = await userService.createUser({
      username: 'jdoe',
      password: 'pass',
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@example.com',
      role: 'teacher',
    });

    expect(user.username).toBe('jdoe');
  });
});
