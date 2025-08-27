const getAllClassrooms = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`);
  return response.json();
};

const createClassroom = async (name: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  return response;
};

const ClassroomService = {
  getAllClassrooms,
  createClassroom,
};

export default ClassroomService;
