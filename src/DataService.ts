import Member from './models/Member';

export default class DataService {
  authSufix() {
    return `key=${process.env.VUE_APP_SPARROW_KEY}&token=${window['Trello'].token()}`;
  }

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  
  json(response) {
    return response.json()
  }
  
  getCards = async (id = process.env.VUE_APP_SPARROW_BOARD_ID) => {
    return await fetch(`https://api.trello.com/1/boards/${id}/cards?customFieldItems=true&${this.authSufix()}`)
      .then(this.status)
      .then(this.json);
  };

  getCustomFieldDefinitions = async (id = process.env.VUE_APP_SPARROW_BOARD_ID) => {
    return await fetch(`https://api.trello.com/1/boards/${id}/customFields?${this.authSufix()}`)
      .then(this.status)
      .then(this.json);
  }

  getBoardMembers = async (id = process.env.VUE_APP_SPARROW_BOARD_ID) => {
    return await fetch(`https://api.trello.com/1//boards/${id}/members?fields=id,fullName,avatarUrl&${this.authSufix()}`)
    .then(this.status)
    .then(this.json)
    .then((v: Member[]) =>
      v.filter(i => !i.fullName.includes('Devyn Cyphers'))
        .sort((a, b) => a.fullName.toLowerCase() === b.fullName.toLowerCase() ? 0 : a.fullName.toLowerCase() < b.fullName.toLowerCase() ? -1 : 1)
        .map(i => ({...i, avatarUrl: `${i.avatarUrl}/170.png`})));
  }
}
