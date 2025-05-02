import { useMemo, useState } from 'react';
import FileUploader from '../components/FileUploader';
import { parseDataFile, ParsedData } from '@/lib/parseDataFile';
import DataPreview from '@/components/DataPreview';
import { extractVariablesFromTemplate } from '@/lib/extractVariablesFromTemplate';
import VariableMapper from '@/components/VariableMapper';
import { generateDocxZip } from '@/lib/generateDocsZip';
import toast from 'react-hot-toast';
import Header from '@/components/Header';

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

  const isUploaded = useMemo(() => {
    return templateVals && dataColumns.length > 0;
  }, [templateVals, dataColumns]);

  /** 파일 생성 */
  const handleClickGenerate = async () => {
    if (!templateFile || !templateVals || dataRows.length === 0) return;
    setIsGenerating(true);

    try {
      await generateDocxZip({ templateFile, dataRows, mapping: mappingVals });
      toast.success('DOCX 파일로 변환 완료!');
    } catch (e) {
      console.error('문서 생성 실패:', e);
      toast.error('파일 생성 중 오류가 발생했어요.');
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
      <Header />
      {/* 파일 업로드 카드 */}
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl z-10">
        <h2 className="text-lg font-semibold mb-4">💾 파일 업로드</h2>

        <FileUploader
          label="📑 템플릿 업로드(.docx)"
          acceptExt={['.docx']}
          buttonColor="bg-blue-600 hover:bg-blue-700"
          handleSelectedFile={handleTemplateFile}
          fileName={templateFile?.name}
          tooltip={
            <>
              📝 템플릿 문서 안에 <b>{'{%이름%}'}</b>, <b>{'{%전화번호%}'}</b>처럼
              <b> 대체 문구</b>를 입력해주세요.
              <br />
              <br />
              문서 생성 시 데이터에 맞게 자동으로 치환됩니다!
            </>
          }
        />

        <FileUploader
          label="🅰️ 데이터 업로드(.csv)"
          acceptExt={['.csv']}
          buttonColor="bg-green-600 hover:bg-green-700"
          handleSelectedFile={handleDataFile}
          fileName={dataFile?.name}
          tooltip={
            <>
              📌 <b>CSV 파일의 첫 줄</b>에는 컬럼명(예: 이름, 전화번호 등)을 적어주세요. 이 컬럼들은 템플릿 문서의{' '}
              <b>{'{%이름%}'}</b> 같은 <b>대체 문구</b>와 연결됩니다.
              <br />
              <br />
              컬럼명과 대체 문구가 동일하면 <b>자동 매핑</b>되며, 필요 시 수동으로도 연결할 수 있습니다.
              <br />
              <br />
              💡 Excel에서 <b>다른 이름으로 저장 &gt; "CSV UTF-8"</b> 형식으로 저장해주세요. 일반 CSV는{' '}
              <span className="text-red-300">한글이 깨질 수 있어요!</span>
            </>
          }
        />

        {dataError && <p className="mt-4 text-sm text-red-500">{dataError}</p>}

        <DataPreview columns={dataColumns} rows={dataRows} />
      </div>

      {/* 매핑 및 생성 카드 */}
      <>
        <div className={`text-3xl z-10 ${!isUploaded && 'opacity-20'}`}>➡️</div>
        <div
          className={`w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col gap-4 z-10  ${
            !isUploaded && 'opacity-20'
          }`}
        >
          <VariableMapper
            templateVariables={templateVals || []}
            dataColumns={dataColumns}
            handleChangeMapping={(mapping) => setMappingVals(mapping)}
          />

          <button
            className={`px-4 py-2 rounded font-semibold text-white transition ${
              validation ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!validation}
            onClick={handleClickGenerate}
          >
            {isGenerating ? '⏳ 생성 중...' : '📦 생성하기'}
          </button>
        </div>
      </>
    </div>
  );
};

export default Home;
