import { useMemo, useState } from 'react';
import FileUploader from '../components/FileUploader';
import { parseDataFile, ParsedData } from '@/lib/parseDataFile';
import DataPreview from '@/components/DataPreview';
import { extractVariablesFromTemplate } from '@/lib/extractVariablesFromTemplate';
import VariableMapper from '@/components/VariableMapper';
import { generateDocxZip } from '@/lib/generateDocsZip';

const Home = () => {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateVals, setTemplateVals] = useState<string[] | null>(null);

  const [dataFile, setDataFile] = useState<File | null>(null);
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<ParsedData['rows']>([]);
  const [dataError, setDataError] = useState<string | null>(null);

  const [mappingVals, setMappingVals] = useState<Record<string, string | null>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const validation = useMemo(() => {
    return templateVals?.every((v) => mappingVals[v] && mappingVals[v] !== '') ?? false;
  }, [mappingVals, templateVals]);

  /** 파일 생성 */
  const handleClickGenerate = async () => {
    if (!templateFile || !templateVals || dataRows.length === 0) return;
    setIsGenerating(true);

    try {
      await generateDocxZip({ templateFile, dataRows, mapping: mappingVals });
    } catch (e) {
      console.error('문서 생성 실패:', e);
      alert('❌ 문서 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

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
          🤖 워드 파일에 데이터 반복 입력 <span className="text-blue-600">노가다</span> 대신 해드려요.
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
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-gray-200 flex flex-col gap-4">
            <VariableMapper
              templateVariables={templateVals}
              dataColumns={dataColumns}
              handleChangeMapping={(mapping) => {
                setMappingVals(mapping);
                console.log('매핑 상태:', mapping);
              }}
            />

            <button
              className={`px-4 py-2 rounded text-white font-semibold transition ${
                validation ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!validation}
              onClick={handleClickGenerate}
            >
              {isGenerating ? '⏳ 생성 중...' : '📦 생성하기'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
