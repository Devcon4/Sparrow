
import { countBy } from 'lodash';
import Card from './models/Card';
import Member from './models/Member';
import { GraphTypes } from './models/GraphTypes';
export type customFieldItems = { id: string, idCustomField: string, idModel: string, idValue: string, modeltype: string};
export type cardType = { customFieldItems: customFieldItems[], id: string, name: string, idMembers: string[], closed: boolean};
export type customFieldCodeOptions = {value: any, idCustomField: string, id: string};
export type customFieldCodes = {id: string, options: customFieldCodeOptions[], name: string};

type Data = {arr?: cardType[], codes?: customFieldCodes[], members?: Member[], currentSprint?: string};

export default class MapDataService {

    public graphTypeToMethodMap = {
        [GraphTypes.CountPerAgency]: this.CardsGroupedByAgency,
        [GraphTypes.CountPerTOW]: this.CardsGroupedByTypeOfWork,
      }

    CardsCompletedCount({arr = []}: Data) {
        return arr.filter(d => d.closed === false).length;
    }

    static FilterCardsToCurrentSprint({arr = [], codes = [], currentSprint}: Data) {
        if(!currentSprint) { return arr; }
        let sprintField = codes.find(c => c.name === 'Sprint');
        let currentOption = sprintField.options.find(o => o.id === currentSprint);
        return arr.filter(c => c.customFieldItems.some(i => i.idCustomField === sprintField.id) && currentOption.id === c.customFieldItems.find(c => c.idCustomField === sprintField.id).idValue);
    }

    CardsToDataTile({arr = [], codes = [], members = [], currentSprint}: Data) {
        let towField = codes.find(c => c.name === 'Type of Work');
        return MapDataService.FilterCardsToCurrentSprint({arr, codes, currentSprint}).map<Card>(c => ({id: c.id, title: c.name, typeOfWorkName: (towField.options.find(o => o.id === (c.customFieldItems.find(i => i.idCustomField === towField.id) || {idValue: null}).idValue) || {value: {text: ''}}).value.text , members: (c.idMembers.map(i => members.find(m => m.id === i).fullName) || []).join(', ') || 'none' }))
    }

    CardsGroupedByTypeOfWork({arr = [], codes = [], currentSprint}: Data) {
        let sprintField = codes.find(c => c.name === 'Sprint');
        let currentOption = sprintField.options.find(o => o.id === currentSprint);
        let normalizeTOW = MapDataService.FilterCardsToCurrentSprint({arr, codes, currentSprint}).filter(d => d.customFieldItems.some(i => codes.some(c => c.name === 'Type of Work' && c.id === i.idCustomField))).map(d => ({...d, field: d.customFieldItems.find(i => i.idCustomField === codes.find(c => c.name === 'Type of Work').id)}));
        let grouped = countBy(normalizeTOW, d => d.field.idValue);
        let final = {};
        let code = codes.find(c => c.name === 'Type of Work');
        if(!code || !code.options) { return []; }
        code.options.forEach(c => final[c.value.text] = grouped[c.id] || 0);
        return final;
    }

    CardsGroupedByAgency({arr = [], codes = [], currentSprint}: Data) {
        let normalizeTOW = MapDataService.FilterCardsToCurrentSprint({arr, codes, currentSprint}).filter(d => d.customFieldItems.some(i => codes.some(c => c.name === 'Project / Contract' && c.id === i.idCustomField))).map(d => ({...d, field: d.customFieldItems.find(i => i.idCustomField === codes.find(c => c.name === 'Project / Contract').id)}));
        let grouped = countBy(normalizeTOW, d => d.field.idValue);
        let final = {};
        let code = codes.find(c => c.name === 'Project / Contract')
        if(!code || !code.options) { return []; }
        code.options.forEach(c => final[c.value.text] = grouped[c.id] || 0);
        return final;
    }

    SprintListFromCustomData({codes = []}: Data) {
        let code = codes.find(a => a.name === 'Sprint');
        if(!code || !code.options) { return []; }
        return code.options;
    }
}