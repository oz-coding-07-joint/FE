import React from "react";
import { fetchAssignments } from "@/api/assignmentApi";
import AssignmentCard from "./assignmentCard";

interface Props {
  params: { lectureId: string };
}

const AssignmentPage = async ({ params }: Props) => {
  const assignments = await fetchAssignments(Number(params.lectureId));

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.assignment.id} assignment={assignment.assignment} />
      ))}
    </div>
  );
};

export default AssignmentPage;
