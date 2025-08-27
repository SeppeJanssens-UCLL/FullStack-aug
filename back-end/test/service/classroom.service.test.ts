import classroomService from '../../service/classroom.service';
import classroomDb from '../../repository/classroom.db';
import { Classroom } from '../../model/classroom';

jest.mock('../../repository/classroom.db');

describe('Classroom Service', () => {
  const mockClassroom = new Classroom({ id: 1, name: 'Class A' });

  it('given classroom in db, when getAllClassrooms is called, then it should return classrooms', async () => {
    (classroomDb.getAllClassrooms as jest.Mock).mockResolvedValue([mockClassroom]);

    const classrooms = await classroomService.getAllClassrooms();
    expect(classrooms).toHaveLength(1);
    expect(classrooms[0].name).toBe('Class A');
  });

  it('given new classroom name, when createClassroom is called, then it should return created classroom', async () => {
    (classroomDb.createClassroom as jest.Mock).mockResolvedValue(mockClassroom);

    const classroom = await classroomService.createClassroom('Class A');
    expect(classroom.id).toBe(1);
    expect(classroom.name).toBe('Class A');
  });
});
