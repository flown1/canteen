export default class UserData {
    name: string;
    email: string;
    imgUrl: string;
    role: string;
    serverAuthCode: string;

    constructor(name, email, imgUrl, role, serverAuthCode) {
        this.name = name;
        this.email = email;
        this.imgUrl = imgUrl;
        this.role = role;
        this.serverAuthCode = serverAuthCode;
    }

}