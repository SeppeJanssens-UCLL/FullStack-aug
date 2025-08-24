import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
  onChange: (teacherId: number, newPath: string) => void;
};

const LearningPath: React.FC<Props> = ({ 
  teacherId, 
  learningPath, 
  onChange 
}: Props) => {
  const [currentPath, setCurrentPath] = useState(learningPath);

  const handleLearningPathChange = (event: { target: { value: string } }) => {
    const newPath = event.target.value;
    setCurrentPath(newPath);
    onChange(teacherId, newPath);
  };

  return (
    <div className="ml-6">
      <select 
        id="learningPath" 
        className="ml-2 p-1" 
        value={currentPath}
        onChange={handleLearningPathChange}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;