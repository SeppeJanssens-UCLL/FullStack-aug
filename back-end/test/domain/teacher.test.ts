import { Teacher } from '../../model/teacher';
import { User } from '../../model/user';

describe('Teacher Domain Object', () => {
  const sampleUser = new User({
    id: 1,
    username: 'jdoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'secret',
    role: 'teacher',
  });

  const validTeacher = {
    id: 10,
    user: sampleUser,
    learningPath: 'Software Engineering',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('given valid teacher data, when creating Teacher instance, then it should initialize correctly', () => {
    const teacher = new Teacher(validTeacher);
    expect(teacher.user).toBeInstanceOf(User);
    expect(teacher.learningPath).toBe('Software Engineering');
  });

  it('given prisma teacher object, when calling from(), then it should return Teacher instance', () => {
    const prismaTeacher = { ...validTeacher, user: sampleUser };
    const teacher = Teacher.from(prismaTeacher as any);
    expect(teacher).toBeInstanceOf(Teacher);
    expect(teacher.user.username).toBe(sampleUser.username);
  });
});
