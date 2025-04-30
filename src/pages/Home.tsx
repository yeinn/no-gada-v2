import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { parseDataFile, ParsedData } from '@/lib/parseDataFile';
import DataPreview from '@/components/DataPreview';
import { extractVariablesFromTemplate } from '@/lib/extractVariablesFromTemplate';
import VariableMapper from '@/components/VariableMapper';

const Home = () => {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateVals, setTemplateVals] = useState<string[] | null>(null);

  const [dataFile, setDataFile] = useState<File | null>(null);
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<ParsedData['rows']>([]);
  const [dataError, setDataError] = useState<string | null>(null);

  /** 템플릿 파일 추출 */
  const handleTemplateFile = async (file: File) => {
    setTemplateFile(file);
    try {
      const vars = await extractVariablesFromTemplate(file);
      setTemplateVals(vars);
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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 gap-6">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl font-extrabold text-gray-800 tracking-tight text-center">
        NO!GADA<span className="text-blue-600">.</span>
        <div className="mt-5 text-lg font-semibold">
          🤖 워드 파일 데이터 입력 <span className="text-blue-600">노가다</span> 대신 해드려요.
        </div>
      </div>

      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-gray-200">
        <h2 className="text-lg font-semibold">💾 파일 업로드</h2>

        <FileUploader
          label="📑 템플릿 업로드 (.docx)"
          acceptExt={['.docx']}
          buttonColor="bg-blue-600 hover:bg-blue-700"
          handleSelectedFile={handleTemplateFile}
          fileName={templateFile?.name}
        />
        <FileUploader
          label="🅰️ 데이터 업로드 (.csv)"
          acceptExt={['.csv']}
          buttonColor="bg-green-600 hover:bg-green-700"
          handleSelectedFile={handleDataFile}
          fileName={dataFile?.name}
        />

        {dataError && <p className="text-sm text-red-500 mt-4">{dataError}</p>}
        <DataPreview columns={dataColumns} rows={dataRows} />
      </div>
      {templateVals && dataColumns.length > 0 && (
        <>
          <div className="text-3xl">➡️</div>
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-gray-200">
            <VariableMapper
              templateVariables={templateVals}
              dataColumns={dataColumns}
              handleChangeMapping={(mapping) => {
                console.log('매핑 상태:', mapping);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
