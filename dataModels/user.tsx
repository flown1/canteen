export default class User {
    firstName: string;
    lastName: string;
    email: string;
    imgUrl: string;
    serverAuthCode: string;

    constructor(firstName, lastName, email, imgUrl, serverAuthCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imgUrl = imgUrl;
        this.serverAuthCode = serverAuthCode;
    }

}