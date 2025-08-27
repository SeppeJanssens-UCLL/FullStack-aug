import { Classroom } from '../../model/classroom';

describe('Classroom Domain Object', () => {
  const validClassroom = {
    id: 1,
    name: 'B104',
  };

  it('given valid classroom data, when creating Classroom instance, then it should initialize correctly', () => {
    const classroom = new Classroom(validClassroom);
    expect(classroom.id).toBe(validClassroom.id);
    expect(classroom.name).toBe(validClassroom.name);
  });

  it('given prisma classroom object, when calling from(), then it should return Classroom instance', () => {
    const prismaClassroom = { id: 2, name: 'A104' };
    const classroom = Classroom.from(prismaClassroom);
    expect(classroom).toBeInstanceOf(Classroom);
    expect(classroom.name).toBe('A104');
  });
});
