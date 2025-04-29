import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FileExtensionType } from '@/constants/fileExtensionType';

export interface ParsedData {
  columns: string[];
  rows: Record<string, string | number | null>[];
}

export async function parseDataFile(file: File): Promise<ParsedData> {
  const ext = file.name.split('.').pop()?.toLocaleLowerCase();

  //임시 미지원
  if (ext === FileExtensionType.XLSX || ext === FileExtensionType.XLS) {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array', raw: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as (string | number)[][];

    const columns = (json[0] as string[]) || [];
    const rows = json.slice(1).map((row) => {
      const rowData: Record<string, string | number | null> = {};
      columns.forEach((col, idx) => {
        rowData[col] = row[idx] ?? '';
      });
      return rowData;
    });

    return { columns, rows };
  }

  if (ext === FileExtensionType.CSV) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (!Array.isArray(result.data) || !result.meta.fields) {
            reject(new Error('CSV 파싱 실패'));
          } else {
            resolve({ columns: result.meta.fields, rows: result.data as Record<string, string | number | null>[] });
          }
        },
      });
    });
  }

  throw new Error('미지원 파일 형식입니다.');
}
