
let isListenerAssigned = false;

var myHeaders = new Headers();
// myHeaders.append("Authorization", "Basic dXNlcjo4YTJhODdkNC00ZTM0LTRlMjUtYmJiMi03YWJmNjk3MjAxMmU=");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getComments() {
  fetch("https://secure-fortress-93208-8703d6dae399.herokuapp.com/comments", requestOptions)
    .then(response => response.json())
    .then(result => {
      fillSlider(result)
      currentIndexC = 1;
    })
    .catch(error => console.log('error', error));
}

getComments();

function fillSlider(result) {
  var sliderContent = document.querySelector('#comments')
  const windowWidth = window.innerWidth;

  if (windowWidth <= 576)
    sliderContent = document.querySelector('#comments-576')
  else if (windowWidth <= 768)
    sliderContent = document.querySelector('#comments-768')
  else if (windowWidth <= 992)
    sliderContent = document.querySelector('#comments-992')
  else if (windowWidth > 993)
    sliderContent = document.querySelector('#comments-1199')
  while (sliderContent.firstChild) {
    sliderContent.removeChild(sliderContent.firstChild);
  }
  sliderContent.innerHTML = '';
  console.log(result);

  result.forEach(comment => {
    const sliderItem = document.createElement('li');
    sliderItem.classList.add('slider__item', 'slider__item_comment');
    sliderItem.innerHTML = `
          <div class="card card-feedback card-shadowed mx-2">
            <div class="comment">
              <div class="comment__wrapper">
                <div class="comment__heading">
                  <img class="comment__student-photo" src="./img/jpg/Frame.jpg" alt="" width="55" height="55">
                  <div class="comment__info">
                    <p class="comment__author">${comment.author}</p>
                    <p class="comment__date">${comment.date.slice(0, comment.date.indexOf('T'))}</p>
                  </div>
                </div>
                <div class="comment__body">
                  <p>
                    ${comment.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
    sliderContent.appendChild(sliderItem);
  });
  nextButton(windowWidth, sliderContent)
}

function createRightArrow() {
  const rightArrow = document.createElement('li');
  rightArrow.classList.add('right_arrow_comment', 'slider__item');
  rightArrow.id = 'right_arrow_comment_id';
  rightArrow.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="img_animation">
   <path d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18" stroke="#403F3D"
         stroke-linecap="round"
         stroke-linejoin="round"/>
</svg>`;
  return rightArrow;
}

function nextButton(windowWidth, sliderElement) {
  const numberToShow = getNumberToShow(windowWidth)
  const sliderItems = sliderElement.querySelectorAll('.slider__item_comment');

  const showSliderItems = (slides) => {
    sliderElement.innerHTML = '';
    slides.forEach((item, index) => {
      sliderElement.appendChild(item);
      item.style.opacity = '0';
      item.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        item.style.opacity = '1'; // Fade-in animation
      }, index * 200); // You can adjust the duration between each item
    });
  };

  if (sliderItems.length > numberToShow && !isListenerAssigned) {
    const nextButton = document.querySelector("#right_arrow_comment_id-" + getScreenSizeComment(windowWidth));
    nextButton.addEventListener('click', () => showSliderItems(showNextComments(sliderItems, numberToShow)));

    const prevButton = document.querySelector("#left_arrow_comment_id-" + getScreenSizeComment(windowWidth));
    prevButton.addEventListener('click', () => showSliderItems(showPrevComments(sliderItems, numberToShow)));
    isListenerAssigned = true;
  }

  showSliderItems(Array.from(sliderItems).slice(0, numberToShow));
}

const form = document.querySelector('#commentForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fullname = document.querySelector('#fullname').value;
  const comment = document.querySelector('#comment').value;
  // Send POST request
  if (fullname.length < 20 && comment.length < 149) {
    fetch('https://secure-fortress-93208-8703d6dae399.herokuapp.com/comments', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        author: fullname,
        comment: comment,
        date: new Date(),
      }),
    })
      .then(_ => {
        getComments();
        document.querySelector('#fullname').value = '';
        document.querySelector('#comment').value = '';
      })
      .catch(_ => {
        // Handle the error here
      });
  } else {
    showAlert("Имя или текст введенного комментария слишком длинные!", "dangerAlert");
  }
});

function getScreenSizeComment(windowWidth) {
  if (windowWidth <= 576)
    return '576'
  else if (windowWidth <= 768)
    return '768'
  else if (windowWidth <= 992)
    return '992'
  else if (windowWidth > 993)
    return '1199'
}

function getNumberToShow(windowWidth) {
  if (windowWidth <= 576)
    return 1
  else if (windowWidth <= 768)
    return 1
  else if (windowWidth <= 992)
    return 2
  else if (windowWidth > 993)
    return 3
}

var currentIndexC = 1;

function showNextComments(comments, numberToShow) {
  console.log('sliders',comments);
  let displayedComments = [];

  for (var i = 0; i < numberToShow; i++) {
    var comment = comments[(currentIndexC + i) % comments.length];
    displayedComments.push(comment);
  }
  currentIndexC = (currentIndexC + 1) % comments.length;
  return displayedComments;
}

function showPrevComments(comments, numberToShow) {
  let displayedComments = [];

  for (var i = numberToShow - 1; i >= 0; i--) {
    var commentIndex = (currentIndexC - i) < 0 ? comments.length - 1 : (currentIndexC - i);
    var comment = comments[commentIndex];
    displayedComments.push(comment);
  }

  currentIndexC = currentIndexC > 0 ? currentIndexC - 1 : comments.length - 1;
  return displayedComments;
}