"use client";

import { useEffect, useState } from "react";
import { fetchAssignments } from "@/api/assignmentApi";
import { Assignment } from "@/types/assignment";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAssignments() {
      try {
        const data = await fetchAssignments();
        setAssignments(data);
      } catch (error) {
        console.error("과제 목록을 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAssignments();
  }, []);

  if (isLoading) return <div className="text-center text-foreground">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">과제 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={assignment.fileUrl || "/placeholder.jpg"}
              alt={assignment.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2 text-foreground">
              {assignment.title}
            </h3>
            <div className="w-full bg-muted-200 h-2 rounded-full mt-2">
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: "50%" }} // 임시 값, 실제 데이터로 대체 필요
              ></div>
            </div>
            <p className="text-muted-400 text-sm mt-1">50% 제출 완료</p>
            <div className="flex justify-between mt-4">
              <button className="bg-primary-500 text-white px-4 py-2 rounded">
                제출 보기
              </button>
              <button className="bg-secondary-500 text-white px-4 py-2 rounded">
                제출하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}