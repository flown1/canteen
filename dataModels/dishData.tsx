export default class DishData {
    id: string;
    namePL: string;
    nameEN: string;
    descPL: string;
    descEN: string;
    imgUrl: string;
    price: number;
    currency: string;

    constructor(id, namePL, nameEN, descPL, descEN, imgUrl, price, currency) {
        this.id = id;
        this.namePL= namePL;
        this.nameEN = nameEN;
        this.descPL = descPL;
        this.descEN = descEN;
        this.imgUrl = imgUrl;
        this.price = price;
        this.currency = currency;
    }

}