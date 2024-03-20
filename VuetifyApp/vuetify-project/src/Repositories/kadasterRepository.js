import Repository from "./Repository";

const resource = "/key";
export default {
    get() {
        return Repository.get(`${resource}`);
    },

    getAdress() {
        return Repository.get(`${resource}/car`);
    },
}