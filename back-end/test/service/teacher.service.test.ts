import teacherService from '../../service/teacher.service';
import teacherDb from '../../repository/teacher.db';
import { Teacher } from '../../model/teacher';
import { User } from '../../model/user';

jest.mock('../../repository/teacher.db');

describe('Teacher Service', () => {
  const mockUser = new User({
    id: 1,
    username: 'jdoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'pass',
    role: 'teacher',
  });

  const mockTeacher = new Teacher({ id: 1, user: mockUser, learningPath: 'Math' });

  it('given teachers exist in db, when getAllTeachers is called, then it returns teachers', async () => {
    (teacherDb.getAllTeachers as jest.Mock).mockResolvedValue([mockTeacher]);

    const teachers = await teacherService.getAllTeachers();
    expect(teachers).toHaveLength(1);
    expect(teachers[0].learningPath).toBe('Math');
  });

  it('given teacherId and new learning path, when updateLearningPath is called, then it updates teacher', async () => {
    const updatedTeacher = new Teacher({ ...mockTeacher, learningPath: 'Science' });
    (teacherDb.updateLearningPath as jest.Mock).mockResolvedValue(updatedTeacher);

    const result = await teacherService.updateLearningPath(1, 'Science');
    expect(result.learningPath).toBe('Science');
  });
});
