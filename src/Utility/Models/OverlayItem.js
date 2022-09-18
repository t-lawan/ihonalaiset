export class OverlayItem {
    title;
    type;
    video_url;
    text;
    isOn = false;

    constructor(title, type, video_url, text = null, isOn = false) {
        this.title = title;
        this.type = type;
        this.video_url = video_url;
        this.text = text;
        this.isOn = isOn;
    }
}