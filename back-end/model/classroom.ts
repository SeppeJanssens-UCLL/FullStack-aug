export class Classroom {
    readonly id?: number;
    readonly name: string;

    constructor(classroom: {
        id?: number;
        name: string;
    }) {
        this.id = classroom.id;
        this.name = classroom.name;
    }

    static from(prismaClassroom: { id: number; name: string }): Classroom {
        return new Classroom({
            id: prismaClassroom.id,
            name: prismaClassroom.name,
        });
    }
}