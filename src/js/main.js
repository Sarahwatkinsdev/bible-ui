import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import '../scss/blog.css'
import '../js/color-modes.js'
import $ from 'jquery';

// const toastTrigger = document.getElementsByClassName('liveToastBtn')[0]
// const toastLiveExample = document.getElementById('liveToast')

// if (toastTrigger) {
//   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
//   toastTrigger.addEventListener('click', () => {
//     toastBootstrap.show()
//   })
// }

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Nice, you triggered this alert message!', 'success')
  })
}


let versecontainer = document.getElementById("versecontainer")
let element = document.getElementById("versetemplate")
let saved = JSON.parse(localStorage.getItem('saved'));

if (versecontainer != null & saved != null){

  saved.forEach(verse => {
  let elem = element.content.cloneNode(true)
  elem.getElementById("topic").innerHTML = verse.topic
  elem.getElementById("ref").innerHTML = verse.ref
  elem.getElementById("text").innerHTML = verse.text

  versecontainer.appendChild(elem)
})
}
const versesarray = JSON.parse(localStorage.getItem('verses'));
let searchcontainer = document.getElementById("searchcontainer")

if (versesarray != null & searchcontainer != null) {
  versesarray.forEach(verse => {
    let elem = element.content.cloneNode(true)
    elem.getElementById("topic").innerHTML = "verse.topic"
    elem.getElementById("ref").innerHTML = verse.reference
    elem.getElementById("text").innerHTML = verse.text
    searchcontainer.appendChild(elem)
  })
}

function myFunction(){
  var searchquery = $('#searchquery').val();
  console.log(searchquery)
}

$(function () {
  $('body').on('click', '.dom-submit', function (e) {
      var searchquery = $('#searchquery').val();
      var mform = $(this.form)
      $.ajax({
        url: 'http://127.0.0.1:5000/search_verses?query=' + searchquery,
        method: 'GET',
        success: function(data) {
          localStorage.setItem('verses', JSON.stringify(data['verses']));
          window.location.href = "/searchedverses.html"
        },
        error: function(error) {
          // handle the error
        }
      });

      e.preventDefault();
  });
});

$(function () {
  $('body').on('click', '.nav-link', function (e) {

      let elem = $('.nav-link.active')
      elem.removeClass('active');

      var searchquery = $(this)[0].innerHTML
      $(this)[0].classList.add('active');

      $.ajax({
        url: 'http://127.0.0.1:5000/search_verses?query=' + searchquery,
        method: 'GET',
        success: function(data) {
          localStorage.setItem('verses', JSON.stringify(data['verses']));
          window.location.href = "/searchedverses.html"
        },
        error: function(error) {
          // handle the error
        }
      });

      e.preventDefault();
  });
});



$(function () {
  $('body').on('click', '.icon-link', function (e) {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

      let elem = $(this)[0].parentElement
      let saved = JSON.parse(localStorage.getItem('saved'));
      if (saved == null){
        saved = []
      }
      saved.push({
        'topic': elem.children[0].innerHTML,
        'ref': elem.children[1].innerHTML,
        'text': elem.children[2].innerHTML})

      toastBootstrap.show()
      localStorage.setItem('saved', JSON.stringify(saved));
  });
});

