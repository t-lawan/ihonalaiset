import { OverlayItem } from "../Models/OverlayItem";


export const OVERLAY_ITEM_TYPE = {
	TEXT: 'TEXT',
	VIDEO: 'VIDEO'
}

export const OverlayItemMap = {
	SPORE: {
		order: 1,
		title: "SPORE", 
		hasWatched: false
	},
	DIAMOND: {
		order: 2,
		title: "DIAMOND",
		hasWatched: false
	},
	MUSHROOM: {
		order: 3,
		title: "MUSHROOM",
		hasWatched: false

	},
	SWIRL: {
		order: 4,
		title: "SWIRL",
		hasWatched: false

	},
	SPHERE: {
		order: 5,
		title: "SPHERE",
		hasWatched: false

	},
}
export const ITEM_LIST = {
    SPORE: new OverlayItem(OverlayItemMap.SPORE.title, OVERLAY_ITEM_TYPE.VIDEO, 1, "https://player.vimeo.com/video/902179234", null, false), // Film
	DIAMOND: new OverlayItem(OverlayItemMap.DIAMOND.title, OVERLAY_ITEM_TYPE.VIDEO, 2, "https://player.vimeo.com/video/902180309", null, false), // Music Video
	MUSHROOM: new OverlayItem(OverlayItemMap.MUSHROOM.title,OVERLAY_ITEM_TYPE.VIDEO, 3,  "https://player.vimeo.com/video/902180620", null, false), // 
	SWIRL: new OverlayItem(OverlayItemMap.SWIRL.title,OVERLAY_ITEM_TYPE.VIDEO, 4,  "https://player.vimeo.com/video/902180996", null, false), // 
	SPHERE: new OverlayItem(OverlayItemMap.SPHERE.title,OVERLAY_ITEM_TYPE.VIDEO, 5, "https://player.vimeo.com/video/902181818", null, false), // 
	ABOUT: new OverlayItem("About", OVERLAY_ITEM_TYPE.TEXT, null, null, "Subskinians / Ihonalaiset (2023) is a web-based short film that discusses the questions of self-ownership and ecological relationships. The story revolves around a protagonist, who one day notices that something unexpected is growing out of her ear. This leads to a series of events that invites the spectator to contemplate on questions of consent as well as the division of self and other and human and nature. The film is based on Kanerva Lehtonen’s short story of the same name, written in 2015.", false), // 	
}


export const transformItemList = (item_list_object) => {
	let arr = [];
	let keys = Object.keys(item_list_object);

	// Convert for Redux
	keys.forEach(key => {
		arr.push(item_list_object[key].toJson())
	})

	// Filter item without order
	arr = arr.filter((item) => {
		return item.order;
	})

	// Sort appropriately
	arr.sort((a,b) => {
		return a.order - b.order
	})


	// Check last watched.

	// If doesn't exist then first should be set to On

	arr[0].isOn = true;

	return arr;
}

export const WORK_GROUP_LIST = [
	{
		title: "Original story and screen writing",
		name: "Kanerva Lehtonen"
	},
	{
		title: "Animation, edit and screen writing",
		name: "Vilja Achte"
	},
	{
		title: "Composition and sound design",
		name: "Lauri Achte"
	},
	{
		title: "Narration",
		name: "Inka Achte"
	},
	{
		title: "Translation",
		name: "Maija Timonen"
	},
	{
		title: "Website",
		name: "Thomas Lawanson"
	},
	{
		title: "Logo Design",
		name: "Hanna Valle"
	},
]
