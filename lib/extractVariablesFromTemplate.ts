import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export function extractVariablesFromTemplate(file: File): Promise<string[]> {
  return new Promise((resolve, rejuect) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result;
        if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
          throw new Error('파일을 읽을 수 없습니다.');
        }

        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          delimiters: { start: '{%', end: '%}' },
        });

        const variables =
          doc
            .getFullText()
            .match(/{%(.*?)%}/g)
            ?.map((v) => v.replace(/{%|%}/g, '').trim()) ?? [];

        const unique = [...new Set(variables)];
        resolve(unique);
      } catch (error) {
        rejuect(error);
      }
    };
    reader.onerror = () => rejuect(reader.error);
    reader.readAsArrayBuffer(file);
  });
}
