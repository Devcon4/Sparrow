export default class Card {
  public id = '';
  public categoryName = '';
  public title = '';
  public members: string = '';
  constructor(init: Partial<Card>) {
    Object.assign(this, init);
  }
}
