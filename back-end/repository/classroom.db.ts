import database from '../util/database';
import { Classroom } from '../model/classroom';

const getAllClassrooms = async (): Promise<Classroom[]> => {
    try {
        const classrooms = await database.classroom.findMany();
        return classrooms.map(Classroom.from);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const createClassroom = async (name: string): Promise<Classroom> => {
    try {
        const newClassroom = await database.classroom.create({
            data: { name }
        });
        return Classroom.from(newClassroom);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllClassrooms,
    createClassroom
};