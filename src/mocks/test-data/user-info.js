import {adaptUserInfoToClient} from "../../utils/adapter";

const userInfo = {
  "avatar_url": "https://assets.htmlacademy.ru/intensives/javascript-3/avatar/7.jpg",
  "email": "Oliver.conner@gmail.com",
  "id": 1,
  "is_pro": false,
  "name": "Oliver.conner"
};

const mockUserInfo = adaptUserInfoToClient(userInfo);

export {userInfo};
export default mockUserInfo;
