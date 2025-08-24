import LearningPath from '@components/learning-path';
import TeacherService from '@services/TeacherService';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [teacherList, setTeacherList] = useState<Teacher[]>(teachers);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLearningPathChange = async (teacherId: number, newPath: string) => {
    try {
      await TeacherService.updateLearningPath(teacherId, newPath);
      
      setTeacherList(prevTeachers => 
        prevTeachers.map(teacher => 
          teacher.id === teacherId 
            ? { ...teacher, learningPath: newPath }
            : teacher
        )
      );
    } catch (error) {
      console.error('Failed to update learning path:', error);
    }
  };

  return (
    <section className="mt-5">
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Learning path</th>
          </tr>
        </thead>
        <tbody>
          {/* Render a row for each teacher containing name and learning path */}
          {teacherList.map((teacher) => (
            <tr>
              <td>
                {teacher.user.firstName  + " " + teacher.user.lastName}
              </td>
              <td>
                {loggedInUser && loggedInUser.role === 'admin' ? (
                  <LearningPath
                    learningPath={teacher.learningPath}
                    teacherId={teacher.id}
                    onChange={handleLearningPathChange}
                  />
                ) : (
                  <span>{teacher.learningPath}</span>
                )}
              </td>
            </tr>
          ))}
          {/* For question 1.c, you can use the LearningPath component. */}
        </tbody>
      </table>
    </section>
  );
};

export default TeacherOverview;