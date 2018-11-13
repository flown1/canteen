import DishData from "../dataModels/dishData";
import { CONFIG } from "../config/config";
import { CANTEEN_API_CONSTANTS } from "../constants/CanteenApi";

export default class ApiFetcher {


    static getAllDishes(callback: Function): void{
        const ROOT = `${CONFIG.SERVER_INFO.ROOT_URL}:${CONFIG.SERVER_INFO.PORT}`;
        const DISHES_ENDPOINT = CANTEEN_API_CONSTANTS.ENDPOINTS.GET_DISHES;
        console.log(`${ROOT}${DISHES_ENDPOINT}`);

        fetch(ROOT + DISHES_ENDPOINT)
        .then(( data ) => {return data.json()})
        .then(( dataJson ) => {
            console.log("GetDishes result: ", dataJson);

            let dishes = new Array<DishData>();

            dataJson.data.map((d) => {
               dishes.push(new DishData(d._id.$oid, d.namePL, d.nameEN, d.descPL, d.descEN, d.imgUrl, d.price, d.currency));
            });

            callback(dishes);
        })
        .catch((e) => {
            console.error(`Error while GetDishes at ${ROOT + DISHES_ENDPOINT}: ${e}`);
            callback(null)
        });

    }
}