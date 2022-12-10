/**
 * Created by n.see on 2022/12/11
 */

const SS = window.sessionStorage;

const storage = {
    setItem: (key: string, val: any) => {
        SS.setItem(key, JSON.stringify(val));
        return this;
    },
    getItem: (key: string) => {
        if (!key) return null;
        return JSON.parse(SS.getItem(key) || "");
    },
};

export default storage;
