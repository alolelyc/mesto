export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // возвращает объект с данными пользователя
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };

    return userInfo;
  }

  setUserInfo(name, job) {
    // принимает новые данные пользователя и добавляет на страницу
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
