import { OverlayItem } from "../Models/OverlayItem";


export const OVERLAY_ITEM_TYPE = {
	TEXT: 'TEXT',
	VIDEO: 'VIDEO'
}
export const ITEM_LIST = {
    SOY_CUBA: new OverlayItem("Soy Cuba", OVERLAY_ITEM_TYPE.VIDEO, "https://www.youtube.com/embed/BwEabZrGFfI", null, false), // Film
	PHARCYDE: new OverlayItem("The Pharcyde - Drop", OVERLAY_ITEM_TYPE.VIDEO, "https://www.youtube.com/embed/wqVsfGQ_1SU", null, false), // Music Video
	MONA_LISA: new OverlayItem("Mona Lisa",OVERLAY_ITEM_TYPE.VIDEO, "https://www.youtube.com/embed/wqVsfGQ_1SU", null, true), // 
	LOREM_IPSUM: new OverlayItem("Lorem Ipsum", OVERLAY_ITEM_TYPE.TEXT, null, "Butcher 3 wolf moon affogato four loko fixie bodega boys biodiesel pitchfork whatever", false), // 
	TIME: new OverlayItem("Time", OVERLAY_ITEM_TYPE.TEXT, null, "Time is the continued sequence of existence and events that occurs in an apparently irreversible succession from the past, through the present, into the future.[1][2][3] It is a component quantity of various measurements used to sequence events, to compare the duration of events or the intervals between them, and to quantify rates of change of quantities in material reality or in the conscious experience.[4][5][6][7] Time is often referred to as a fourth dimension, along with three spatial dimensions.[8]", false), // 
	ABOUT: new OverlayItem("About", OVERLAY_ITEM_TYPE.TEXT, null, "Portland snackwave iPhone tattooed, JOMO green juice succulents. 3 wolf moon lo-fi kogi pork belly wolf, vibecession vape seitan yuccie. Chambray biodiesel cred cloud bread bespoke ennui. Before they sold out neutra single-origin coffee, bicycle rights adaptogen blue bottle synth photo booth normcore artisan cornhole. Four dollar toast umami kogi, ugh cliche blue bottle shoreditch.", false), // 
	
}

