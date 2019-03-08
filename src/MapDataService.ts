
import { countBy, groupBy } from 'lodash';
type customFieldItems = { id: string, idCustomField: string, idModel: string, idValue: string, modeltype: string};
type cardType = { customFieldItems: customFieldItems[], id: string, closed: boolean};
type customFieldCodeOptions = {value: any, idCustomField: string, id: string};
type customFieldCodes = {id: string, options: customFieldCodeOptions[], name: string};

export default class MapDataService {

    CardsCompletedCount(arr: cardType[]) {
        return arr.filter(d => d.closed === false).length;
    }

    CardsGroupedByTypeOfWork(arr: cardType[], codes: customFieldCodes[]) {
        let towField = codes.find(c => c.name === 'Type of Work');
        let normalizeTOW = arr.filter(d => d.customFieldItems.some(i => codes.some(c => c.name === 'Type of Work' && c.id === i.idCustomField))).map(d => ({...d, field: d.customFieldItems.find(i => i.idCustomField === codes.find(c => c.name === 'Type of Work').id)}));
        let grouped = countBy(normalizeTOW, d => d.field.idValue);
        let final = {};
        codes.find(c => c.name === 'Type of Work').options.forEach(c => final[c.value.text] = grouped[c.id] || 0);
        return final;
    }
}