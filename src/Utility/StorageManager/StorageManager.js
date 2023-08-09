
export default class StorageManager {
    static key = "index";

    static save(object) {
        console.log("save", object);

        localStorage.setItem(this.key, JSON.stringify(object))
    }

    static get() {
        const val = localStorage.getItem(this.key)
        console.log("get", val);
        return val ? JSON.parse(val) : null;
    }
}