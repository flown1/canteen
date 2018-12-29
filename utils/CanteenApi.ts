import DishData from "../dataModels/DishData";
import { Config } from "../config/Config";
import { CANTEEN_API_CONSTANTS } from "../constants/CanteenApi";
import GoogleAuthUser from "../dataModels/GoogleAuthUser";


export default class CanteenApi {

    static getAllDishes(callback: Function): void {
        const ROOT = `${Config.SERVER_INFO.ROOT_URL}:${Config.SERVER_INFO.PORT}`;
        const DISHES_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.GET_DISHES;

        fetch(ROOT + DISHES_ENDPOINT)
        .then(( data ) => {return data.json()})
        .then(( dataJson ) => {
            let dishes = new Array<DishData>();
            dataJson.data.map((d) => {
                dishes.push(new DishData(d._id.$oid, d.namePL, d.nameEN, d.descPL, d.descEN, d.imgUrl, d.price, d.isPromoted, d.menuId, d.tags, d.currency));
            });
            callback(dishes);
        })
        .catch((e) => {
            console.error(`Error while getAllDishes at: ${e}`);
            callback(null)
        });
    }

    static postDish(dishData: DishData, callback: Function): void {
        const ROOT = `${Config.SERVER_INFO.ROOT_URL}:${Config.SERVER_INFO.PORT}`;
        const POST_DISH_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.POST_DISHES;

        fetch(ROOT + POST_DISH_ENDPOINT, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'namePL':   dishData.namePL,
                'nameEN':   dishData.nameEN,
                'descPL':   dishData.descPL,
                'descEN':   dishData.descEN,
                'price':    dishData.price,
                'imgUrl':   dishData.imgUrl,
                'tags':     dishData.tags,
                'currency': dishData.currency,
                'menu_id':  dishData.menuId,
                'isPromoted': dishData.isPromoted
            }),
        })
        .then(( data ) => {return data.json()})
        .then(( dishData ) => {
            callback(dishData);
        })
        .catch((e) => {
            console.error(`Error while postDish(): ${e}`);
            callback({data: {}, status: "ERROR"})
        });
    }

    static putDish(dishData: DishData, callback: (res) => void) {
        const ROOT = `${Config.SERVER_INFO.ROOT_URL}:${Config.SERVER_INFO.PORT}`;
        const PUT_DISH_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.PUT_DISHES;

        fetch(ROOT + PUT_DISH_ENDPOINT, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'namePL':   dishData.namePL,
                'nameEN':   dishData.nameEN,
                'descPL':   dishData.descPL,
                'descEN':   dishData.descEN,
                'price':    dishData.price,
                'imgUrl':   dishData.imgUrl,
                'tags':     dishData.tags,
                'currency': dishData.currency,
                'menu_id':  dishData.menuId,
                'isPromoted': dishData.isPromoted
            }),
        })
        .then(( data ) => {return data.json()})
        .then(( data ) => {
            callback(data);
        })
        .catch((e) => {
            console.error(`Error while postDish(): ${e}`);
            callback({data: {}, status: "ERROR"})
        });
    }

    static postUser(googleAuthUser: GoogleAuthUser, callback: (res) => void): void {
        const ROOT = `${Config.SERVER_INFO.ROOT_URL}:${Config.SERVER_INFO.PORT}`;
        const POST_USER_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.POST_USER;

        fetch(ROOT + POST_USER_ENDPOINT, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(googleAuthUser),
        })
        .then(( data ) => {return data.json()})
        .then(( userJson ) => {

            console.log("[USER] Received: ", userJson);
            callback(userJson);
        })
        .catch((e) => {
            console.error(`Error while postUser at: ${e}`);
            callback({data: {}, status: "ERROR"})
        });
    }
}
