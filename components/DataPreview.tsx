interface DataPreviewProps {
  columns: string[];
  rows: Record<string, string | number | null>[];
}

const DataPreview = ({ columns, rows }: DataPreviewProps) => {
  if (!columns.length) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-sm mb-2">데이터 미리보기 (최대 5개)</h2>
      <div className="overflow-auto rounded border">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-2 py-1 bg-gray-100">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 5).map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col} className="px-2 py-1 border-t">
                    {row[col] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPreview;
