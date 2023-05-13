
export default class CompareModule {

    constructor(element) {
        this.init(element);
    }

    init(element) {

        function compareImages(compareContainer) {
            var slider, compareContainer, overlayImage, clicked = 0, width, height;

            overlayImage = document.getElementById(compareContainer.dataset.overlay);

            width = overlayImage.offsetWidth;
            height = overlayImage.offsetHeight;

            overlayImage.style.width = (width / 2) + "px";

            slider = document.getElementById(compareContainer.dataset.slider);
            overlayImage.parentElement.insertBefore(slider, overlayImage);

            slider.style.top = (height / 2) - (slider.offsetHeight / 2) + "px";
            slider.style.left = (width / 2) - (slider.offsetWidth / 2) + "px";

            slider.addEventListener("mousedown", slideReady);
            slider.addEventListener("touchstart", slideReady);
            window.addEventListener("mouseup", slideFinish);
            window.addEventListener("touchend", slideFinish);

            function slideReady(event) {
                event.preventDefault();
                clicked = 1;
                window.addEventListener("mousemove", slideMove);
                window.addEventListener("touchmove", slideMove);
            }

            function slideFinish() {
                clicked = 0;
            }

            function slideMove(event) {
                var position;
                if (clicked == 0) return false;
                position = getCursorPos(event)
                if (position < 0) position = 0;
                if (position > width) position = width;
                slide(position);
            }

            function getCursorPos(event) {
                var rect, x = 0;
                event = (event.changedTouches) ? event.changedTouches[0] : event;
                rect = overlayImage.getBoundingClientRect();
                x = event.pageX - rect.left;
                x = x - window.pageXOffset;
                return x;
            }

            function slide(x) {
                overlayImage.style.width = x + "px";
                slider.style.left = overlayImage.offsetWidth - (slider.offsetWidth / 2) + "px";
            }

        }
        compareImages(element);

    }

}
