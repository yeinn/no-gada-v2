import { ChangeEvent, useMemo, useRef } from 'react';

interface FileUploaderProps {
  label: string;
  acceptExt: string[];
  buttonColor?: string;
  handleSelectedFile: (file: File) => void;
  fileName?: string;
}

const FileUploader = ({
  label,
  acceptExt,
  buttonColor = 'bg-blue-600 hover:bg-blue-700',
  handleSelectedFile,
  fileName,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  //memo
  const acceptString = useMemo(() => acceptExt.join(','), [acceptExt]);

  //handler
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isChkExt = acceptExt.some((type) => file?.name.endsWith(type));
    if (file && isChkExt) {
      handleSelectedFile(file);
    } else {
      alert(`${acceptString} 파일만 업로드 가능합ㄴ디ㅏ.`);
      e.target.value = '';
    }
  };
  return (
    <div className="flex flex-col gap-2 mt-6">
      <label className="font-semibold">{label}</label>
      <div className="fles gap-4 items-center">
        <button
          type="button"
          className={`px-4 py-2 text-white rounded transition ${buttonColor}`}
          onClick={() => inputRef.current?.click()}
        >
          파일 선택
        </button>
        <span className="text-sm text-gray-500 ml-3">{fileName || '선택한 파일이 없습니다.'}</span>
      </div>
      <input className="hidden" ref={inputRef} type="file" accept={acceptString} onChange={handleChangeFile} />
    </div>
  );
};

export default FileUploader;
