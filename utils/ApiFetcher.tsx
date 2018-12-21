import DishData from "../dataModels/DishData";
import { CONFIG } from "../config/config";
import { CANTEEN_API_CONSTANTS } from "../constants/CanteenApi";
import GoogleAuthUser from "../dataModels/GoogleAuthUser";


export default class ApiFetcher {

    static getAllDishes(callback: Function): void {
        const ROOT = `${CONFIG.SERVER_INFO.ROOT_URL}:${CONFIG.SERVER_INFO.PORT}`;
        const DISHES_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.GET_DISHES;

        fetch(ROOT + DISHES_ENDPOINT)
        .then(( data ) => {return data.json()})
        .then(( dataJson ) => {
            let dishes = new Array<DishData>();
            dataJson.data.map((d) => {
               dishes.push(new DishData(d._id.$oid, d.namePL, d.nameEN, d.descPL, d.descEN, d.imgUrl, d.price, d.tags, d.currency));
            });

            // console.log("Dishes: ", dishes);
            callback(dishes);
        })
        .catch((e) => {
            console.error(`Error while getAllDishes at ${ROOT + DISHES_ENDPOINT}: ${e}`);
            callback(null)
        });
    }

    static postUser(googleAuthUser: GoogleAuthUser, callback: Function): void {
        const ROOT = `${CONFIG.SERVER_INFO.ROOT_URL}:${CONFIG.SERVER_INFO.PORT}`;
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

            console.log("Received: ", userJson);
            callback(userJson);
        })
        .catch((e) => {
            console.error(`Error while postUser at ${ROOT + POST_USER_ENDPOINT}: ${e}`);
            callback({data: {}, status: "ERROR"})
        });
    }
}
