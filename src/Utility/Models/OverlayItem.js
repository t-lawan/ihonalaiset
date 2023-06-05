export class OverlayItem {
    title;
    type;
    video_url;
    text;
    order;
    isOn = false;
    hasWatched = false

    constructor(title, type, order, video_url, text = null, isOn = false) {
        this.title = title;
        this.type = type;
        this.video_url = video_url;
        this.text = text;
        this.isOn = isOn;
        this.order = order;
    }

    toJson = () => {
        return {
            title: this.title,
            type: this.type,
            video_url: this.video_url,
            text: this.text,
            order: this.order,
            hasWatched: this.hasWatched, 
            isOn: this.isOn
        }
    }
}