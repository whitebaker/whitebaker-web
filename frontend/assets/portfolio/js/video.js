
export default class VideoModule {

	constructor(element) {

      	this.init();

    }

    init() {

		const enableAudio = false;
		const enableFullscreen = true;

		// Select elements here
		const video = document.getElementById('video');
		const videoControls = document.getElementById('video-controls');
		const playButton = document.getElementById('play');
		const playbackIcons = document.querySelectorAll('.playback-icons img');
		const timeElapsed = document.getElementById('time-elapsed');
		const duration = document.getElementById('duration');
		const progressBar = document.getElementById('progress-bar');
		const seek = document.getElementById('seek');
		const seekTooltip = document.getElementById('seek-tooltip');
		const volumeButton = document.getElementById('volume-button');
		const volumeIcons = document.querySelectorAll('.volume-button img');
		const volumeMute = document.querySelector('#volume-button-mute');
		const volumeLow = document.querySelector('#volume-button-low');
		const volumeHigh = document.querySelector('#volume-button-high');
		const volume = document.getElementById('volume');
		const playbackAnimation = document.getElementById('playback-animation');
		const fullscreenButton = document.getElementById('fullscreen-button');
		const videoContainer = document.getElementById('video-player');
		if (enableFullscreen) {
		    const fullscreenIcons = fullscreenButton.querySelectorAll('img');
		}

		const videoWorks = !!document.createElement('video').canPlayType;
		if (videoWorks) {
		  video.controls = false;
		  videoControls.classList.remove('hidden');
		}

		video.addEventListener("contextmenu", (event) => {
	      event.preventDefault();
	    });


		// Add functions here

		// togglePlay toggles the playback state of the video.
		// If the video playback is paused or ended, the video is played
		// otherwise, the video is paused
		function togglePlay() {
		  if (video.paused || video.ended) {
		    video.play();
		  } else {
		    video.pause();
		  }
		}

		// updatePlayButton updates the playback icon and tooltip
		// depending on the playback state
		function updatePlayButton() {
		  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

		  if (video.paused) {
		    playButton.setAttribute('data-title', 'Play');
		  } else {
		    playButton.setAttribute('data-title', 'Pause');
		  }
		}

		// formatTime takes a time length in seconds and returns the time in
		// minutes and seconds
		function formatTime(timeInSeconds) {
		  return {
		    minutes: Math.floor(timeInSeconds / 60),
		    seconds: timeInSeconds % 60,
		  };
		}

		// initializeVideo sets the video duration, and maximum value of the
		// progressBar
		function initializeVideo() {
		  const videoDuration = Math.round(video.duration);
		  seek.setAttribute('max', videoDuration);
		  progressBar.setAttribute('max', videoDuration);
		  const time = formatTime(videoDuration);
		  duration.innerText = `${time.minutes}:${time.seconds}`;
		  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
		}

		// updateTimeElapsed indicates how far through the video
		// the current playback is by updating the timeElapsed element
		function updateTimeElapsed() {
		  const time = formatTime(Math.round(video.currentTime));
		  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
		  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
		}

		// updateProgress indicates how far through the video
		// the current playback is by updating the progress bar
		function updateProgress() {
		      seek.value = Math.floor(video.currentTime);
		      progressBar.value = Math.floor(video.currentTime);
		}

		// updateSeekTooltip uses the position of the mouse on the progress bar to
		// roughly work out what point in the video the user will skip to if
		// the progress bar is clicked at that point
		function updateSeekTooltip(event) {
		  const skipTo = Math.round(
		    (event.offsetX / event.currentTarget.clientWidth) *
		      parseInt(event.currentTarget.getAttribute('max'), 10)
		  );
		  seek.setAttribute('data-seek', skipTo);
		  const t = formatTime(skipTo);
		  seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
		  const rect = video.getBoundingClientRect();
		  seekTooltip.style.left = `${event.pageX - rect.left}px`;
		}

		// skipAhead jumps to a different point in the video when the progress bar
		// is clicked
		function skipAhead(event) {
		  const skipTo = event.currentTarget.dataset.seek
		    ? event.currentTarget.dataset.seek
		    : event.currentTarget.value;
		  video.currentTime = skipTo;
		  progressBar.value = skipTo;
		  seek.value = skipTo;
		}

		// updateVolume updates the video's volume
		// and disables the muted state if active
		function updateVolume() {

		        if (!enableAudio) return;
		  if (video.muted) {
		    video.muted = false;
		  }

		  video.volume = volume.value;
		}

		// updateVolumeIcon updates the volume icon so that it correctly reflects
		// the volume of the video
		function updateVolumeIcon() {
		    if (!enableAudio) return;

		  volumeIcons.forEach((icon) => {
		    icon.classList.add('hidden');
		  });

		  volumeButton.setAttribute('data-title', 'Mute');

		  if (video.muted || video.volume === 0) {
		    volumeMute.classList.remove('hidden');
		    volumeButton.setAttribute('data-title', 'Unmute');
		  } else if (video.volume > 0 && video.volume <= 0.5) {
		    volumeLow.classList.remove('hidden');
		  } else {
		    volumeHigh.classList.remove('hidden');
		  }
		}

		// toggleMute mutes or unmutes the video when executed
		// When the video is unmuted, the volume is returned to the value
		// it was set to before the video was muted
		function toggleMute() {
		    if (!enableAudio) return;

		  video.muted = !video.muted;

		  if (video.muted) {
		    volume.setAttribute('data-volume', volume.value);
		    volume.value = 0;
		  } else {
		    volume.value = volume.dataset.volume;
		  }
		}

		// animatePlayback displays an animation when
		// the video is played or paused
		function animatePlayback() {
		  playbackAnimation.animate(
		    [
		      {
		        opacity: 1,
		        transform: 'scale(1)',
		      },
		      {
		        opacity: 0,
		        transform: 'scale(1.3)',
		      },
		    ],
		    {
		      duration: 500,
		    }
		  );
		}

		// toggleFullScreen toggles the full screen state of the video
		// If the browser is currently in fullscreen mode,
		// then it should exit and vice versa.
		function toggleFullScreen() {
		    if (!enableFullscreen) return;


		  if (document.fullscreenElement) {
		    document.exitFullscreen();
		  } else if (document.webkitFullscreenElement) {
		    // Need this to support Safari
		    document.webkitExitFullscreen();
		  } else if (videoContainer.webkitRequestFullscreen) {
		    // Need this to support Safari
		    videoContainer.webkitRequestFullscreen();
		  } else {
		    videoContainer.requestFullscreen();
		  }
		}

		// updateFullscreenButton changes the icon of the full screen button
		// and tooltip to reflect the current full screen state of the video
		function updateFullscreenButton() {
		    if (!enableFullscreen) return;

		  fullscreenIcons.forEach((icon) => icon.classList.toggle('hidden'));

		  if (document.fullscreenElement) {
		    fullscreenButton.setAttribute('data-title', 'Exit full screen');
		  } else {
		    fullscreenButton.setAttribute('data-title', 'Full screen');
		  }
		}

		// hideControls hides the video controls when not in use
		// if the video is paused, the controls must remain visible
		function hideControls() {
		  if (video.paused) {
		    return;
		  }

		  videoControls.classList.add('hide');
		}

		// showControls displays the video controls
		function showControls() {
		  videoControls.classList.remove('hide');
		}

		// keyboardShortcuts executes the relevant functions for
		// each supported shortcut key
		function keyboardShortcuts(event) {
		  const { key } = event;
		  /*
		  switch (key) {
		    case 'k':
		      togglePlay();
		      animatePlayback();
		      if (video.paused) {
		        showControls();
		      } else {
		        setTimeout(() => {
		          hideControls();
		        }, 2000);
		      }
		      break;
		    case 'm':
		      toggleMute();
		      break;
		    case 'f':
		      toggleFullScreen();
		      break;
		  }
		  */
		}

		function docReady(fn) {
		    if (document.readyState === "complete" || document.readyState === "interactive") {
		        setTimeout(fn, 1);
		    } else {
		        document.addEventListener("DOMContentLoaded", fn);
		    }
		}

		docReady(function() {
		    if (video.readyState > 0) {
		        initializeVideo();
		    } else {
		        video.addEventListener('loadedmetadata', initializeVideo);
		    };
		});

		// Add eventlisteners here
		playButton.addEventListener('click', togglePlay);
		video.addEventListener('play', updatePlayButton);
		video.addEventListener('pause', updatePlayButton);
		video.addEventListener('timeupdate', updateTimeElapsed);
		video.addEventListener('timeupdate', updateProgress);
		video.addEventListener('volumechange', updateVolumeIcon);
		video.addEventListener('click', togglePlay);
		video.addEventListener('click', animatePlayback);
		video.addEventListener('mouseenter', showControls);
		video.addEventListener('mouseleave', hideControls);
		videoControls.addEventListener('mouseenter', showControls);
		videoControls.addEventListener('mouseleave', hideControls);
		seek.addEventListener('mousemove', updateSeekTooltip);
		seek.addEventListener('input', skipAhead);

		if (enableAudio) {
		    volume.addEventListener('input', updateVolume);
		    volumeButton.addEventListener('click', toggleMute);
		};

		if (enableFullscreen) {
		    fullscreenButton.addEventListener('click', toggleFullScreen);
		}
		videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);

		document.addEventListener('keyup', keyboardShortcuts);


    }
}
