import DocumentLottie from './DocumentLottie';

const Header = () => {
  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center text-gray-800">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
        NO!GADA<span className="text-blue-600">.</span>
      </h1>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold text-gray-600">
        🤖 워드 파일에 엑셀 데이터 자동 입력 <span className="text-blue-600">노가다</span> 대신 해드려요.
      </p>
      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto">
        <DocumentLottie />
      </div>
    </div>
  );
};
export default Header;
