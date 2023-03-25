import { OverlayItem } from "../Models/OverlayItem";


export const OVERLAY_ITEM_TYPE = {
	TEXT: 'TEXT',
	VIDEO: 'VIDEO'
}
export const ITEM_LIST = {
    SPORE: new OverlayItem("SPORE", OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/805147249", null, false), // Film
	DIAMOND: new OverlayItem("DIAMOND", OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/805150867", null, false), // Music Video
	MUSHROOM: new OverlayItem("MUSHROOM",OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/805153167", null, true), // 
	SWIRL: new OverlayItem("SWIRL",OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/805154658", null, false), // 
	SPHERE: new OverlayItem("SPHERE",OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/805155573", null, false), // 
	ABOUT: new OverlayItem("About", OVERLAY_ITEM_TYPE.TEXT, null, "Ihonalaiset is an animated short film that discusses the questions of self-ownership and ecological relationships. The story revolves around a woman, whose everyday life gets interrupted one morning as she notices that something unexpected is growing out of her ear. This leads to a series of events that invites the spectator to contemplate on questions of consent as well as the division of self and other and human and nature. The film is created by Vilja Achté and is based on Kanerva Lehtonen’s short story.", false), // 
	
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
