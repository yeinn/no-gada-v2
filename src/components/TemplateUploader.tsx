import { ChangeEvent } from 'react';

interface TemplateUploaderProps {
  onFileSelected: (file: File) => void;
  fileName?: string;
}

const TemplateUploader = ({ onFileSelected, fileName }: TemplateUploaderProps) => {
  //handler
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        onFileSelected(file);
      } else {
        alert('.docx 파일만 업로드 할 수 있습니다.');
      }
    }
  };
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">템플릿 파일 업로드 (.docx)</label>

      <input
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
        type="file"
        accept=".docx"
        onChange={handleChangeFile}
      />
      {fileName && <p className="mt-2 text-sm text-gray-600">선택된 파일: {fileName}</p>}
    </div>
  );
};

export default TemplateUploader;
