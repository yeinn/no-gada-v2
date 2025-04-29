import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { parseDataFile, ParsedData } from '@/lib/parseDataFile';
import DataPreview from '@/components/DataPreview';
import { extractVariablesFromTemplate } from '@/lib/extractVariablesFromTemplate';

const Home = () => {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<ParsedData['rows']>([]);
  const [dataError, setDataError] = useState<string | null>(null);

  /** 템플릿 파일 추출 */
  const handleTemplateFile = async (file: File) => {
    setTemplateFile(file);
    try {
      const vars = await extractVariablesFromTemplate(file);
      console.log('템플릿 변수:: ', vars);
    } catch (e) {
      console.error('템플릿 변수 추출 실패', e);
    }
  };

  /** 데이터 파일 파싱 */
  const handleDataFile = async (file: File) => {
    setDataFile(file);
    setDataError(null);

    try {
      const { columns, rows } = await parseDataFile(file);
      setDataColumns(columns);
      setDataRows(rows);
    } catch (e: unknown) {
      console.error(e);

      if (e instanceof Error) {
        setDataError(e.message);
      } else {
        setDataError('파일 파싱 실패');
      }
      setDataColumns([]);
      setDataRows([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6">NO!GADA - 🤖노가다</h1>
        <FileUploader
          label="📑 템플릿 파일 업로드 (.docx)"
          acceptExt={['.docx']}
          buttonColor="bg-blue-600 hover:bg-blue-700"
          handleSelectedFile={handleTemplateFile}
          fileName={templateFile?.name}
        />
        <FileUploader
          label="🅰️ 데이터 파일 업로드 (.csv)"
          acceptExt={['.csv']}
          buttonColor="bg-green-600 hover:bg-green-700"
          handleSelectedFile={handleDataFile}
          fileName={dataFile?.name}
        />

        {dataError && <p className="text-sm text-red-500 mt-4">{dataError}</p>}
        <DataPreview columns={dataColumns} rows={dataRows} />
      </div>
    </div>
  );
};

export default Home;
