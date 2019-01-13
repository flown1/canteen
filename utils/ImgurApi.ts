import {Config} from "../config/Config";
import ApiKeys from "../constants/ApiKeys";
import {IMGUR_API_CONSTANST} from "../constants/ImgurApi";

export default class ImgurApi {

    static postImage(image, name: String, callback: Function) {
        const ROOT = `${Config.IMGUR.ROOT_URL}`;
        const POST_IMAGE = IMGUR_API_CONSTANST.ENPOINTS_IMGUR.POST_IMAGE;

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
            callback(data);
        })
        .catch((e) => {
            console.error(`Error while posting image to imgur ${ROOT + POST_IMAGE}: ${e}`);
            callback({data: {}, status: "ERROR"})
        });
    }
}