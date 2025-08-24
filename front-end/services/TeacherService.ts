const getAllTeachers = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teachers`);
};

const updateLearningPath = async (teacherId: number, learningPath: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teachers/${teacherId}/learningpath`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ learningPath }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update learning path: ${response.statusText}`);
  }

  return response.json();
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
