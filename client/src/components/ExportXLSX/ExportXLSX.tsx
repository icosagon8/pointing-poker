import React from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

interface Props {
  xlsxData: unknown[];
  fileName: string;
}

export const ExportXLSX = ({ xlsxData, fileName }: Props): JSX.Element => {
  const FILE_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const FILE_EXTENSION = '.xlsx';

  const exportToXLSX = (data: unknown[], filename: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new File([excelBuffer], filename + FILE_EXTENSION, { type: FILE_TYPE });
    saveAs(file);
  };

  return (
    <Button className="btn" startIcon={<GetAppIcon />} onClick={() => exportToXLSX(xlsxData, fileName)}>
      Export
    </Button>
  );
};
