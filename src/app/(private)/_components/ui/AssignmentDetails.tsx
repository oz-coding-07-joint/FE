import { Assignment } from '@/types/assignment';

interface AssignmentDetailsProps {
  assignment: Assignment;
}

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({ assignment }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{assignment.title}</h1>
      <p className="mt-2 text-gray-700">{assignment.content}</p>
      
      <div className="mt-4">
        {assignment.fileUrl && (
          <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Download Assignment File
          </a>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetails;
