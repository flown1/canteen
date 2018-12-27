export default class DishData {
    id: string;
    namePL: string;
    nameEN: string;
    descPL: string;
    descEN: string;
    imgUrl: string;
    price: number;
    isPromoted: boolean;
    menuId: number;
    tags: Array<String>;
    currency: string;

    constructor(id, namePL, nameEN, descPL, descEN, imgUrl, price, isPromoted, menuId, tags, currency) {
        this.id = id;
        this.namePL= namePL;
        this.nameEN = nameEN;
        this.descPL = descPL;
        this.descEN = descEN;
        this.imgUrl = imgUrl;
        this.price = price;
        this.isPromoted = isPromoted;
        this.menuId = menuId;
        this.tags = tags;
        this.currency = currency;
    }

}