export default class UnityModule {

    constructor(element) {

      this.element = element;
      this.id = element.dataset.id;
      this.width = element.dataset.width;
      this.height = element.dataset.height;
      this.padding = element.dataset.padding;
      this.buildFileData = element.dataset.buildFileData;
      this.buildFileFramework = element.dataset.buildFileFramework;
      this.buildFileLoader = element.dataset.buildFileLoader;
      this.buildFileWasm = element.dataset.buildFileWasm;

      this.buildFileWasm = element.dataset.buildFileWasm;

      this.button = document.querySelector("#unity-button-" + element.dataset.id);

      this.placeholder = document.querySelector("#unity-placeholder-" + element.dataset.id);

      this.container = document.querySelector("#unity-container-" + element.dataset.id);
      this.canvas = document.querySelector("#unity-canvas-" + element.dataset.id);

      this.loadingBar = document.querySelector("#unity-loading-bar-" + element.dataset.id);
      this.progressBarFull = document.querySelector("#unity-progress-bar-full-" + element.dataset.id);
      this.warningBanner = document.querySelector("#unity-warning-" + element.dataset.id);

      this.config = undefined;

      this.isMobile = this.checkIfMobile();

      this.init();

    }

    checkIfMobile() {
       let isMobile;
       if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
          isMobile = true ;
       } else {
           if (window.screen.height > window.screen.width) {
              isMobile = true ;
           } else {
              isMobile = false ;
           }
       }
        return isMobile;
    }

    init() {

        // Shows a temporary message banner/ribbon for a few seconds, or
        // a permanent error message on top of the canvas if type=='error'.
        // If type=='warning', a yellow highlight color is used.
        // Modify or remove this function to customize the visually presented
        // way that non-critical warnings and error messages are presented to the
        // user.
        function unityShowBanner(msg, type) {
        /*
          function updateBannerVisibility() {
            this.warningBanner.style.display = this.warningBanner.children.length ? 'block' : 'none';
          }
          var div = document.createElement('div');
          div.innerHTML = msg;
          this.warningBanner.appendChild(div);
          if (type == 'error') div.style = 'background: red; padding: 10px;';
          else {
            if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
            setTimeout(function() {
              this.warningBanner.removeChild(div);
              updateBannerVisibility();
            }, 5000);
          }
          updateBannerVisibility();
        */
        }

        var buildUrl = "";
        var loaderUrl = buildUrl + this.buildFileLoader;
        this.config = {
          dataUrl: buildUrl + this.buildFileData,
          frameworkUrl: buildUrl + this.buildFileFramework,
          codeUrl: buildUrl + this.buildFileWasm,
          streamingAssetsUrl: "StreamingAssets",
          companyName: "whitebaker",
          productName: "eggert",
          productVersion: "1.0.0",
          showBanner: unityShowBanner,
        };

        // By default Unity keeps WebGL canvas render target size matched with
        // the DOM size of the canvas element (scaled by window.devicePixelRatio)
        // Set this to false if you want to decouple this synchronization from
        // happening inside the engine, and you would instead like to size up
        // the canvas DOM size and WebGL render target sizes yourself.
        // config.matchWebGLToCanvasSize = false;

        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          // Mobile device style: fill the whole browser client area with the game canvas:

          var meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
          document.getElementsByTagName('head')[0].appendChild(meta);
          this.container.className = "unity-mobile";
          this.canvas.className = "unity-mobile";

          // To lower canvas resolution on mobile devices to gain some
          // performance, uncomment the following line:
          // config.devicePixelRatio = 1;

          unityShowBanner('WebGL builds are not supported on mobile devices.');
        } else {
          // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

          this.canvas.style.width = this.width - 2 * this.padding + "px";
          this.canvas.style.height = this.height - 2 * this.padding + "px";
        }

        this.loadingBar.style.display = "block";

        const unityModule = this;
        function onPlay(event) {
            unityModule.play();
        }

        var script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            if (this.button && !this.isMobile) {
              this.button.style.display = "block";
              this.button.addEventListener("click", onPlay);
            }
        };

        document.body.appendChild(script);

    }

    play() {
        if (this.placeholder) {
          this.placeholder.style.display = "none";
        }
        createUnityInstance(this.canvas, this.config, (progress) => {
          this.progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          this.loadingBar.style.display = "none";
        }).catch((message) => {
          alert(message);
        });
    }

}
