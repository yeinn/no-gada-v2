import { useEffect, useState } from 'react';

interface VariableMapperProps {
  templateVariables: string[];
  dataColumns: string[];
  handleChangeMapping: (mapping: Record<string, string | null>) => void;
}

const VariableMapper = ({ templateVariables, dataColumns, handleChangeMapping }: VariableMapperProps) => {
  //state
  const [mapping, setMapping] = useState<Record<string, string | null>>({});

  //handler
  const handleChange = (templateVar: string, column: string) => {
    setMapping((prev) => ({ ...prev, [templateVar]: column }));
  };

  const handleAutoMap = () => {
    const autoMapped = Object.fromEntries(
      templateVariables.map((v) => {
        const match = dataColumns.find((col) => col === v || col.replace(/\s/g, '') === v);
        return [v, match || null];
      })
    );
    setMapping(autoMapped);
  };

  const handleReset = () => {
    const reset = Object.fromEntries(templateVariables.map((v) => [v, null]));
    setMapping(reset);
  };

  useEffect(() => {
    const initial = Object.fromEntries(templateVariables.map((v) => [v, null]));
    setMapping(initial);
  }, [templateVariables]);

  useEffect(() => {
    handleChangeMapping(mapping);
  }, [mapping, handleChangeMapping]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">🧩 템플릿 변수 - 데이터 컬럼 매칭</h2>
      <div className="flex gap-x-3">
        <button onClick={handleAutoMap} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          🔁 자동 매칭
        </button>
        <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500">
          🗑 초기화
        </button>
      </div>
      <div className="flex items-center gap-x-4 border-b pb-1 font-semibold text-gray-600 text-sm">
        <div className="w-1/2">템플릿 변수</div>
        <div className="w-1/2">데이터 컬럼</div>
      </div>

      {templateVariables.map((templateVar) => (
        <div key={templateVar} className="flex items-center gap-x-4 border-b pb-2">
          <div className="w-1/2 font-mono text-gray-700">{templateVar}</div>
          <select
            className="w-1/2 border rounded p-1"
            value={mapping[templateVar] ?? ''}
            onChange={(e) => handleChange(templateVar, e.target.value)}
          >
            <option value="">(선택하세요)</option>
            {dataColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default VariableMapper;
