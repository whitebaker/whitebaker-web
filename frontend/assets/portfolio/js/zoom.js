
const imageButtons = document.querySelectorAll(".image-zoomable .image-zoomable-image img");
const closeButtons = document.querySelectorAll(".image-zoomable .image-zoomable-button-close");

for (let i = 0; i < imageButtons.length; i++) {
    imageButtons[i].addEventListener("click", (event) => {
        event.preventDefault();
        const imageZoomable = event.currentTarget.closest('.image-zoomable');
        imageZoomable.classList.add('zoom');

        const scrollY = -window.scrollY;
        console.log(scrollY);
        document.body.style.position = 'fixed';
        document.body.style.top = scrollY + 'px';
    });
}

for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", (event) => {
        event.preventDefault();
        const imageZoomable = event.currentTarget.closest('.image-zoomable');
        imageZoomable.classList.remove('zoom');

        const scrollY = document.body.style.top;
        console.log(scrollY);
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    });
}
