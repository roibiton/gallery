console.log('Starting up');


function onInit() {
  console.log('Page is ready')
  renderProjs()
}

function renderProjs() {
  const projs = getProjs()
  const strHTMLs = projs.map(proj => `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="openModal('${proj.id}')">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/proj/${proj.id}-thumbnail.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
        </div>
    
    `)

  document.querySelector('.proj-preview-list').innerHTML = strHTMLs.join()
}

function openModal(projId) {
  const proj = getProjById(projId)
  const elModal = document.querySelector('.modal-body')
  elModal.querySelector('h2').innerText = proj.name
  elModal.querySelector('.item-intro.text-muted').innerText = proj.title
  elModal.querySelector('.describeArea').innerText = proj.desc
  elModal.querySelector('img').src = `img/proj/${proj.id}-full.jpg`

}

function send() {
  var email = $('#1').val()
  var subject = $('#2').val()
  var message = $('#3').val()
  // console.log(email,subject,message)
  const url = `http://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}&su=${subject}&body=${message}`
  // var url = `https://mail.google.com/mail/u/0/?fs=1&to=${email}&su=${subject}&b&tf=${message}`
  window.open(url)
  clear()
}
function clear($el){
  $el.val('')
}


