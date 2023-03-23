import { OverlayItem } from "../Models/OverlayItem";


export const OVERLAY_ITEM_TYPE = {
	TEXT: 'TEXT',
	VIDEO: 'VIDEO'
}
export const ITEM_LIST = {
    SOY_CUBA: new OverlayItem("Soy Cuba", OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/751273705", null, false), // Film
	PHARCYDE: new OverlayItem("The Pharcyde - Drop", OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/751273705", null, false), // Music Video
	MONA_LISA: new OverlayItem("Mona Lisa",OVERLAY_ITEM_TYPE.VIDEO, "https://player.vimeo.com/video/751273705", null, true), // 
	LOREM_IPSUM: new OverlayItem("Lorem Ipsum", OVERLAY_ITEM_TYPE.TEXT, null, "Butcher 3 wolf moon affogato four loko fixie bodega boys biodiesel pitchfork whatever", false), // 
	TIME: new OverlayItem("Time", OVERLAY_ITEM_TYPE.TEXT, null, "Time is the continued sequence of existence and events that occurs in an apparently irreversible succession from the past, through the present, into the future.[1][2][3] It is a component quantity of various measurements used to sequence events, to compare the duration of events or the intervals between them, and to quantify rates of change of quantities in material reality or in the conscious experience.[4][5][6][7] Time is often referred to as a fourth dimension, along with three spatial dimensions.[8]", false), // 
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
		name: "Vilja Achte"
	},
	{
		title: "Narration",
		name: "Vilja Achte"
	},
	{
		title: "Translation",
		name: "Vilja Achte"
	},
	{
		title: "Website",
		name: "Vilja Achte"
	},
	{
		title: "Logo Design",
		name: "Vilja Achte"
	},
]
