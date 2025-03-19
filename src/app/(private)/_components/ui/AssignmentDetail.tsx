interface AssignmentData {
  id: number;
  title: string;
  content: string;
  file_url?: string;
}

interface AssignmentDetailProps {
  selectedAssignment: AssignmentData | null;
}

const AssignmentDetail = ({ selectedAssignment }: AssignmentDetailProps) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden flex-1 h-[75vh] flex flex-col">
      <div className="bg-[#F5F9FF] p-4 h-16 border border-gray-300">
        <h2 className="text-xl font-semibold text-black">{selectedAssignment ? selectedAssignment.title : "과제 내용"}</h2>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        {selectedAssignment ? <p className="text-gray-700">{selectedAssignment.content}</p> : <p>과제를 선택해주세요.</p>}
      </div>
      <div className="p-4 border-t bg-white">
        {selectedAssignment?.file_url ? (
          <a href={selectedAssignment.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            첨부 파일 보기
          </a>
        ) : (
          <p className="text-gray-700">첨부 파일 없음</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetail;
