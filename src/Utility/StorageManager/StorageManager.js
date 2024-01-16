
export default class StorageManager {
    static key = "index";

    static save(object) {
        localStorage.setItem(this.key, JSON.stringify(object))
    }

    static get() {
        const val = localStorage.getItem(this.key)
        return val ? JSON.parse(val) : null;
    }
}