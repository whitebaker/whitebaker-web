

export default class Navigation {

    constructor(element) {

    	this.element = element;
        this.isOpen = false;
    	this.hamburger = document.getElementById("hamburger");
        this.content = document.getElementById("portfolio-content");

        this.init();
    }

    init() {

        this.hamburger.addEventListener('click', (clickEvent) => {
            this.toggle();
        });

        // initialize scroll
        const anchors = document.querySelectorAll("#navigation ul li a");
        for(let i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', (clickEvent) => {
                clickEvent.preventDefault();
                const target = document.getElementById(clickEvent.currentTarget.getAttribute("href").split('#')[1]);
                if (target) {
                    scroll({
                        top: target.offsetTop - 120,
                        behavior: "smooth"
                      });
                }
            });
        }
	}

    toggle() {
        if (!this.isOpen) {
            this.isOpen = true;
    		this.hamburger.classList.add('open');
            this.element.classList.add('open');
            this.content.classList.add('open');
        } else {
            this.isOpen = false;
    		this.hamburger.classList.remove('open');
            this.element.classList.remove('open');
            this.content.classList.remove('open');
        }
	}

}
