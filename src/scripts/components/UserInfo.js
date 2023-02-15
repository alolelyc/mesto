export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // возвращает объект с данными пользователя
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };

    return userInfo;
  }

  setUserInfo({ name, job }) {
    // принимает новые данные пользователя и добавляет на страницy
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar({ avatar }) {
    console.log(avatar);
    this._avatar.src = avatar;
  }
}
