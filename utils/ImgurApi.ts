import {Config} from "../config/Config";
import {CANTEEN_API_CONSTANTS} from "../constants/CanteenApi";
import ApiKeys from "../constants/ApiKeys";

export default class ImgurApi {

    static postImage(image, name: String, callback: Function) {
        const ROOT = `${Config.IMGUR.ROOT_URL}`;
        const POST_IMAGE = CANTEEN_API_CONSTANTS.ENPOINTS_IMGUR.POST_IMAGE;

        console.log(`image:`, image, `name:`, name);

        fetch(ROOT + POST_IMAGE, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": `Client-ID ` + ApiKeys.IMGUR_CLIENT
            },
            body: JSON.stringify({
                'image': image.base64,
                'name': name
            }),
        })
        .then(( data ) => {return data.json()})
        .then(( data ) => {
            console.log("Received: ", data);
            callback(data);
        })
        .catch((e) => {
            console.error(`Error while posting image to imgur ${ROOT + POST_IMAGE}: ${e}`);
            callback({data: {}, status: "ERROR"})
        });
    }
}