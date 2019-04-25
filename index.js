function initPeerListener(p) {
  p.on('error', function(e) {
    console.log('Peer error: ', e);
  })

  p.on('signal', function(sdpOffer) {
    $('#offer')[0].textContent = JSON.stringify(sdpOffer)
  })
}

$(document).ready(function() {
  $('#create-button').on('click', function() {
    $('#login-page').addClass('hide');
    $('#video-chat-create').removeClass('hide');
  });

  $('#join-button').on('click', function() {
    $('#login-page').addClass('hide');
    $('#video-chat-join').removeClass('hide');
  });

  $('#start').on('click', function() {
    navigator.getUserMedia({
      video: true,
      audio: true
    }, function(stream) {
      let p = new SimplePeer({
        initiator: true,
        stream: stream,
        trickle: false
      });
      initPeerListener(p);

      let emitter       = $('#emitter-video')[0];
      emitter.volume    = 0;
      emitter.srcObject = stream;

      emitter.play();
    }, function(e) {
      console.log("Error: ", e);
    })
  });
});
