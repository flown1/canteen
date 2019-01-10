export default class Translator {

    //should be developed in a more 'sophisticated' way ;-)
    static ENG_POL = {
        PAID : "OPŁACONE",
        READY: "GOTOWE",
        COMPLETE: "ZAKOŃCZONE"
    };

    static engToPol(phrase: String) : string {
        const dictionary = Translator.ENG_POL;
        return dictionary[phrase];
    }
}