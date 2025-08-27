import { Classroom } from "@types";

const getAllClassrooms = async (): Promise<Classroom[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`);
  if (!response.ok) {
    throw new Error("Failed to fetch classrooms");
  }
  return response.json();
};

const createClassroom = async (name: string): Promise<Classroom> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create classroom");
  }

  return response.json();
};

const ClassroomService = {
  getAllClassrooms,
  createClassroom,
};

export default ClassroomService;
