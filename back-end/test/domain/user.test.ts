import { User } from '../../model/user';
import { Role } from '../../types';

describe('User Domain Object', () => {
  const validUser = {
    id: 1,
    username: 'jdoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'secret',
    role: 'teacher' as Role,
  };

  it('given valid user data, when creating User instance, then it should initialize correctly', () => {
    const user = new User(validUser);
    expect(user.id).toBe(validUser.id);
    expect(user.username).toBe(validUser.username);
    expect(user.role).toBe(validUser.role);
  });

  it('given missing required field, when creating User, then it should throw validation error', () => {
    const invalidUser = { ...validUser, username: '' };
    expect(() => new User(invalidUser)).toThrow('Username is required');
  });

  it('given identical data, when using equals, then it should return true', () => {
    const user = new User(validUser);
    expect(user.equals(validUser)).toBe(true);
  });

  it('given prisma user object, when calling from(), then it should return User instance', () => {
    const prismaUser = { ...validUser };
    const user = User.from(prismaUser);
    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe(prismaUser.username);
  });
});
