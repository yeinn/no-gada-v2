import { ChangeEvent, useRef } from 'react';

interface DataUploaderProps {
  onFileSelected: (file: File) => void;
  fileName?: string;
}

const DataUploader = ({ onFileSelected, fileName }: DataUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  //handler
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      onFileSelected(file);
    } else {
      alert('.csv 또는 .xlsx 파일만 업로드 가능합니다.');
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-6">
      <label className="font-semibold">데이터 파일 (.csv 또는 .xlsx)</label>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => inputRef.current?.click()}
        >
          파일 선택
        </button>
        <span className="text-sm text-gray-500">{fileName || '선택된 파일 없음'}</span>
      </div>
      <input ref={inputRef} type="file" accept=".csv, .xlsx" className="hidden" onChange={handleChangeFile} />
    </div>
  );
};
export default DataUploader;
