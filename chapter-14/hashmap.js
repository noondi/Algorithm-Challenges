class HashMap {
    constructor(capactiy) {
        this.capactiy = capactiy;
        this.table = [];
        this.elements = 0;
    }

    hashify(string) {
        if (typeof string == 'string') {
            var hash = 0;
            if (string.length == 0) return hash;
            for (let i = 0; i < string.length; i++) {
                let char = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash &= hash;
            }
            return hash;
        }
    }

    getIndex(value, div) {
        return (value % div + div) % div;
    }

    add(key, val) {
        let index = this.getIndex(this.hashify(key), this.capactiy);
        this.table[index] = new KeyValuePair(key, val);
        this.elements++;
        return this;
    }

    toString() {
        let s = "[ ";
        for (let i = 0; i < this.table.length - 1; i++) {
            if (this.table[i]) {
                s += `${this.table[i]}, `;
            }
        }
        if (this.table[this.table.length - 1]) {
            s += `${this.table[this.table.length - 1]} `;
        }
        s += "]";
        return s;
    }

    find(key) {
        let index = this.getIndex(this.hashify(key), this.capactiy);
        return this.table[index];
    }

    isEmpty() {
        return (this.elements > 0) ? false : true;
    }

    remove(key) {
        let index = this.getIndex(this.hashify(key), this.capactiy);
        let value = this.table[index];
        this.table[index] = undefined;
        this.elements--;
        return (value) ? value : null;
    }

    grow() {
        this.capactiy *= 2;
        for (let i = 0; i < this.table.length; i++) {
            let curVal = this.table[i];
            this.table[i] = undefined;
            if (curVal) {
                this.add(curVal.key, curVal.value);
            }
        }
    }
}

class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return this.value;
    }
}

let hashmap = new HashMap(3);
hashmap.add("myKey", 42).add("aKey", "foo");
console.log(hashmap + "");