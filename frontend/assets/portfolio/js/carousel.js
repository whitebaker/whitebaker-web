import Swiper, { EffectFlip, Navigation, Pagination } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/effect-flip';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const swiper = new Swiper('.swiper-carousel', {
    modules: [EffectFlip, Navigation, Pagination],
    effect: "flip",
    grabCursor: true,
    flipEffect: {
      slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
