/* eslint-disable no-bitwise */
/* eslint-disable dot-notation */
import XLSX from 'xlsx';
import ResultService from './Result';

class XlsxService {
  static async exportResult(expeID) {
    const data = await ResultService.getAllResult(expeID);
    this.dataToExcel(data, `${expeID}.xlsx`);
  }

  static dataToExcel(data, filename) {
    const wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    };
    const wb = {
      SheetNames: ['Sheet1'],
      Sheets: {},
      Props: {},
    };
    wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);
    const str = XLSX.write(wb, wopts);
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i !== str.length; i += 1) view[i] = str.charCodeAt(i) & 0xFF;
    const e = document.createElement('a');
    e.download = filename;
    e.style.display = 'none';
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    e.href = URL.createObjectURL(blob);
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
  }
}

export default XlsxService;
