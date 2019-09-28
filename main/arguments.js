export class Arguments {

    constructor(items) {
        this.items = items;
    }

    find(flag) {
        return this.items.find(item => item.flag === flag);
    }

    get(flag) {
        return this.find(flag).value;
    }

    set(flag, value) {
        this.find(flag).value = value;
    }

}
