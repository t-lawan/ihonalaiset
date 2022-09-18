export class OverlayItem {
    title;
    type;
    video_url;
    text;

    constructor(title, type, video_url, text = null) {
        this.title = title;
        this.type = type;
        this.video_url = video_url;
        this.text = text;
    }
}