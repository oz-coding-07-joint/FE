"use client";

import { Term } from "@/types/auth";
import { useModalStore } from "@/store/useModalStore";

type Props = {
  terms: Term[];
  agreedTerms: { [key: number]: boolean };
  onToggle: (termId: number) => void;
  onSelectTerm: (term: Term) => void;
  isLoading?: boolean;
};

const TermsAgreement = ({ terms, agreedTerms, onToggle, onSelectTerm, isLoading }: Props) => {
  const { openModal } = useModalStore();

  if (isLoading) {
    return <p className="text-sm text-muted-400">약관을 불러오는 중...</p>;
  }

  return (
    <div className="mt-2">
      {terms?.map((term) => (
        <div key={term.id} className="flex items-center justify-between mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={!!agreedTerms[term.id]}
              onChange={() => onToggle(term.id)}
              className="w-4 h-4"
            />
            <span className="text-sm text-muted-400">
              {term.name} {term.isRequired && "(필수)"}
            </span>
          </label>
          <span
            onClick={() => {
              onSelectTerm(term);
              openModal("termsModal");
            }}
            className="text-sm text-muted-300 underline cursor-pointer"
          >
            {term.name} 보기
          </span>
        </div>
      ))}
    </div>
  );
};

export default TermsAgreement;
