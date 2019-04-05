
import { countBy, groupBy } from 'lodash';
import Card from './models/Card';
import Member from './models/Member';
export type customFieldItems = { id: string, idCustomField: string, idModel: string, idValue: string, modeltype: string};
export type cardType = { customFieldItems: customFieldItems[], id: string, name: string, idMembers: string[], closed: boolean};
export type customFieldCodeOptions = {value: any, idCustomField: string, id: string};
export type customFieldCodes = {id: string, options: customFieldCodeOptions[], name: string};

export default class MapDataService {

    CardsCompletedCount(arr: cardType[]) {
        return arr.filter(d => d.closed === false).length;
    }

    CardsToDataTile(arr: cardType[], codes: customFieldCodes[], members: Member[]) {
        let towField = codes.find(c => c.name === 'Type of Work');
        return arr.map<Card>(c => ({id: c.id, title: c.name, typeOfWorkName: (towField.options.find(o => o.id === (c.customFieldItems.find(i => i.idCustomField === towField.id) || {idValue: null}).idValue) || {value: {text: ''}}).value.text , members: (c.idMembers.map(i => members.find(m => m.id === i).fullName) || []).join(', ') || 'none' }))
    }

    CardsGroupedByTypeOfWork(arr: cardType[], codes: customFieldCodes[]) {
        let towField = codes.find(c => c.name === 'Type of Work');
        let normalizeTOW = arr.filter(d => d.customFieldItems.some(i => codes.some(c => c.name === 'Type of Work' && c.id === i.idCustomField))).map(d => ({...d, field: d.customFieldItems.find(i => i.idCustomField === codes.find(c => c.name === 'Type of Work').id)}));
        let grouped = countBy(normalizeTOW, d => d.field.idValue);
        let final = {};
        codes.find(c => c.name === 'Type of Work').options.forEach(c => final[c.value.text] = grouped[c.id] || 0);
        return final;
    }

    CardsGroupedByAgency(arr: cardType[], codes: customFieldCodes[]) {
        let towField = codes.find(c => c.name === 'Project / Contract');
        let normalizeTOW = arr.filter(d => d.customFieldItems.some(i => codes.some(c => c.name === 'Project / Contract' && c.id === i.idCustomField))).map(d => ({...d, field: d.customFieldItems.find(i => i.idCustomField === codes.find(c => c.name === 'Project / Contract').id)}));
        let grouped = countBy(normalizeTOW, d => d.field.idValue);
        let final = {};
        codes.find(c => c.name === 'Project / Contract').options.forEach(c => final[c.value.text] = grouped[c.id] || 0);
        return final;
    }

    SprintListFromCustomData(arr: customFieldCodes[]) {
        return arr.find(a => a.name === 'Sprint').options;
    }
}