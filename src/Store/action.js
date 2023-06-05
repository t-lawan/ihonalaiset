export const HAS_LOADED = 'HAS_LOADED';
export const SET_ITEM_LIST = "SET_ITEM_LIST"

export const hasLoaded = () => {
    return {
        type: HAS_LOADED
    }
}

export const setItemList = (item_list) => {
    return {
        type: SET_ITEM_LIST,
        item_list: item_list
    }
}