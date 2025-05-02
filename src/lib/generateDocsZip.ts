import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface generateDocxZipProps {
  templateFile: File;
  dataRows: Record<string, string | number | null>[];
  mapping: Record<string, string | null>;
}

export async function generateDocxZip({ templateFile, dataRows, mapping }: generateDocxZipProps): Promise<void> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const content = reader.result;
        if (typeof content !== 'string') {
          throw new Error('템플릿 파일 로딩 실패');
        }

        const zip = new PizZip(content);
        const zipFolder = new JSZip();

        for (let i = 0; i < dataRows.length; i++) {
          const row = dataRows[i];

          // 변수 매핑
          const templateData: Record<string, string | number | null> = {};
          for (const [templateVar, csvCol] of Object.entries(mapping)) {
            if (csvCol && row[csvCol] !== undefined) {
              templateData[templateVar] = row[csvCol];
            }
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const doc = new Docxtemplater((zip as any).clone(), {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: { start: '{%', end: '%}' },
          });

          doc.setData(templateData);
          doc.render();

          const out = doc.getZip().generate({ type: 'blob' });
          const filename = `${templateData['이름'] ?? '문서'}_${String(i + 1).padStart(3, '0')}.docx`;

          zipFolder.file(filename, out);
        }

        const finalZip = await zipFolder.generateAsync({ type: 'blob' });
        saveAs(finalZip, 'NOGADA.zip');
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsBinaryString(templateFile);
  });
}
