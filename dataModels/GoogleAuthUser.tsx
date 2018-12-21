export default class GoogleAuthUser {
    name: string;
    email: string;
    imgUrl: string;
    serverAuthCode: string;

    constructor(name, email, imgUrl, serverAuthCode) {
        this.name = name;
        this.email = email;
        this.imgUrl = imgUrl;
        this.serverAuthCode = serverAuthCode;
    }

}