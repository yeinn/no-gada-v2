import { ChangeEvent, useMemo, useRef } from 'react';

interface FileUploaderProps {
  label: string;
  acceptExt: string[];
  buttonColor?: string;
  handleSelectedFile: (file: File) => void;
  fileName?: string;
  tooltip?: React.ReactNode;
}

const FileUploader = ({
  label,
  acceptExt,
  buttonColor = 'bg-blue-600 hover:bg-blue-700',
  handleSelectedFile,
  fileName,
  tooltip,
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
      alert(`${acceptString} 파일만 업로드 가능합니다.`);
      e.target.value = '';
    }
  };
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center gap-2 relative group">
        <label className="font-semibold">{label}</label>

        {/* 툴팁 영역 */}
        {tooltip && (
          <div className="relative group">
            {/* 아이콘 */}
            <div className="w-5 h-5 bg-gray-200 text-gray-700 text-xs font-bold rounded-full flex items-center justify-center cursor-pointer">
              ?
            </div>

            {/* 툴팁 말풍선 */}
            <div
              className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 px-3 py-2 rounded-lg shadow-lg z-10 
  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
  whitespace-pre-line text-white ${buttonColor}`}
            >
              {tooltip}
              {/* 말풍선 꼬리 */}
              <div
                // className={`absolute left-1 top-1/2 -translate-y-1/2 -translate-x-full w-2 h-2 bg-gray-100 rotate-45 shadow-sm`}
                className={`absolute left-1 top-1/2 -translate-y-1/2 -translate-x-full w-2 h-2 rotate-45 ${buttonColor} shadow-sm`}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-center">
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
