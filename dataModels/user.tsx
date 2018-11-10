export default class User {
    private string firstName;
    private string lastName;
    private string email;
    private string token;

    constructor(firstName, lastName, email, token) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
    }

}