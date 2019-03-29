export default class Member {
  id = '';
  fullName = '';
  avatarUrl = '';
  constructor(init: Partial<Member>) {
    Object.assign(this, init);
  }
}
