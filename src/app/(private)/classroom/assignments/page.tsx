"use client";

import { useEffect, useState } from "react";
import { fetchAssignments } from "@/api/assignmentApi";
import { fetchLectures } from "@/api/lectureApi"; // 강의 데이터 참조
import { Assignment } from "@/types/assignment";
import { Lecture } from "@/types/class";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [assignmentData, lectureData] = await Promise.all([
          fetchAssignments(),
          fetchLectures(),
        ]);
        setAssignments(assignmentData);
        setLectures(lectureData);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">과제 목록</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
        {assignments.map((assignment, index) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px]"
          >
            <img
              src={assignment.fileUrl || "/placeholder.jpg"}
              alt={assignment.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {assignment.title}
              </h3>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${lectures[index]?.progressRate || 50}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {lectures[index]?.progressRate || 50}% 과제 완료
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}