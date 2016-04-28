// toggle view 

var triggers = document.querySelectorAll('a');
var panelEls = document.querySelectorAll('.panel');

bindEvents();

function bindEvents() {
  for (var i=0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', function(e) {
      e.preventDefault();
      var clickedEl = e.target; // clicked Element
      setActivePanel(clickedEl);
    });
  }
};

function setActivePanel(clickedEl) {
  var panelTarget = clickedEl.getAttribute('href');
  var panelEl = document.querySelector(panelTarget);

  for (var j=0; j < panelEls.length; j++) {
    panelEls[j].classList.remove('is-visible');
  }
  panelEl.classList.add('is-visible');
};



