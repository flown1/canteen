import DishData from "../dataModels/dishData";
import { CONFIG } from "../config/config";
import { CANTEEN_API_CONSTANTS } from "../constants/CanteenApi";

export default class ApiFetcher {


    static getAllDishes(callback: Function): void{

        const ROOT = `${CONFIG.SERVER_INFO.ROOT_URL}:${CONFIG.SERVER_INFO.PORT}`;
        const DISHES_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.GET_DISHES;

        fetch("http://192.168.69.104:3000/dishes")
        .then(( data ) => { return data.json()})
        .then(( dataJson ) => {
            console.log("GetDishes result: ", dataJson);


            let dishes = new Array<DishData>();

            dataJson.data.map((d) => {
               dishes.push(new DishData(d.id, d.namePL, d.nameEN, d.descPL, d.descEN, d.imgUrl, d.price, d.currecy));
            });
            callback(dishes);

        })
        .catch((e) => {
            console.error(`Error while GetDishes at ${ROOT + DISHES_ENDPOINT}: ${e}`);
            callback(null)
        });

    }
}