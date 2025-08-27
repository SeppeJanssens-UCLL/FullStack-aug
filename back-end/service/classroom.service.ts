import classroomDb from '../repository/classroom.db';
import { Classroom } from '../model/classroom';

const getAllClassrooms = async (): Promise<Classroom[]> => classroomDb.getAllClassrooms();

const createClassroom = async (name: string): Promise<Classroom> => classroomDb.createClassroom(name);

export default { getAllClassrooms, createClassroom };