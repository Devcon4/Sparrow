import { utils, WorkSheet, writeFile, WorkBook } from 'xlsx';

export default class ExcelService {
    MapJsonToXLSX(data: {name: string, data: any}[]) {
        let book = utils.book_new();
        
        let stringifyObs = (obj: any) => {
            let res = {};
            let keys = Object.keys(obj);
            keys.forEach(k => {
                if(typeof(obj[k]) === 'object') {
                    res[k] = JSON.stringify(obj[k]);
                } else {
                    res[k] = obj[k];
                }
            });

            return res;
        } 

        data.forEach(d => {
            let sheet = utils.json_to_sheet(d.data.map(stringifyObs));
            utils.book_append_sheet(book, sheet, d.name);
        });

        return book;
    }

    DownloadWorkSheet(sheet: WorkBook) {
        let date = new Date().toISOString();
        writeFile(sheet, `sparrow-${date}.xlsx`, {type: 'file'});
    }
}