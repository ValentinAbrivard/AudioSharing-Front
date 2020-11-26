document.querySelector('#get-access').addEventListener('click', async function init(e) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
      const videoTracks = stream.getVideoTracks()
      const track = videoTracks[0]
      alert(`Getting video from: ${track.label}`)
      document.querySelector('video').srcObject = stream
      document.querySelector('#get-access').setAttribute('hidden', true)
    } catch (error) {
      alert(`${error.name}`)
      console.error(error)
    }
  })





  /*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
const audio = document.querySelector('audio');

const constraints = window.constraints = {
  audio: true,
  video: false
};

function handleSuccess(stream) {
  const audioTracks = stream.getAudioTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using audio device: ' + audioTracks[0].label);
  stream.oninactive = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  audio.srcObject = stream;
}

function handleError(error) {
  const errorMessage = 'navigator.MediaDevices.getUserMedia error: ' + error.message + ' ' + error.name;
  document.getElementById('errorMsg').innerText = errorMessage;
  console.log(errorMessage);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);



(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject']=r; i[r]=i[r]||function() {
      (i[r].q=i[r].q||[]).push(arguments);
    }, i[r].l=1*new Date(); a=s.createElement(o),
      m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g; m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    
    ga('create', 'UA-48530561-1', 'auto');
    ga('send', 'pageview');