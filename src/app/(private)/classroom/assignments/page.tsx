/* eslint-disable @next/next/no-img-element */
"use client";

import LoadingSkeleton from '@/components/LoadingSkeleton';
import Page from "@/components/Page";
import { useAssignmentStore } from "@/store/useAssignmentStore";
import clsx from 'clsx';
import { Suspense, useEffect } from "react";

export default function AssignmentsPage() {
  const { assignments, isLoading, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <Page title="과제 목록">
      {isLoading ? (
        <Suspense fallback={<LoadingSkeleton />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
            {Array(3).fill(null).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px] h-[300px]">
                <LoadingSkeleton />
              </div>
            ))}
          </div>
        </Suspense>
      ) : assignments.length === 0 ? (
        <div className="text-center text-gray-600">과제가 없습니다</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className={clsx('bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px]', 'hover:shadow-lg transition-shadow')}
            >
              <img
                src={assignment.fileUrl || "/assets/images/no-img.png"}
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
                    style={{ width: `${assignment.progress_rate || 50}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {assignment.progress_rate || 50}% 과제 완료
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}