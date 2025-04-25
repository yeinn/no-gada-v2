import { useState } from 'react';
import FileUploader from '../components/FileUploader';

const Home = () => {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6">NO!GADA - 🤖노가다 알바</h1>
        <FileUploader
          label="📑 템플릿 파일 업로드 (.docx)"
          acceptExt={['.docx']}
          buttonColor="bg-blue-600 hover:bg-blue-700"
          handleSelectedFile={setTemplateFile}
          fileName={templateFile?.name}
        />
        <FileUploader
          label="🅰️ 데이터 파일 업로드 (CSV 또는 Excel .xlsx)"
          acceptExt={['.csv', '.xlsx']}
          buttonColor="bg-green-600 hover:bg-green-700"
          handleSelectedFile={setDataFile}
          fileName={dataFile?.name}
        />{' '}
      </div>
    </div>
  );
};

export default Home;
