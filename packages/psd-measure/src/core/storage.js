/**
 * Created by wujian on 2018/1/4.
 */

const SS = window.sessionStorage

const storage = {
    setItem: (key, val) => {
        SS.setItem(key, JSON.stringify(val))
        return this
    },
    getItem: (key) => {
        if (!key) return null
        return JSON.parse(SS.getItem(key))
    }
}

export default storage
