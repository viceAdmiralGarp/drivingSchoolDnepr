
var myHeaders = new Headers();
// myHeaders.append("Authorization", "Basic dXNlcjo4YTJhODdkNC00ZTM0LTRlMjUtYmJiMi03YWJmNjk3MjAxMmU=");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getComments() {
  fetch("http://ec2-54-162-210-174.compute-1.amazonaws.com:8080/comments", requestOptions)
    .then(response => response.json())
    .then(result => {
      fillSlider(result)
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
  // sliderContent.appendChild(createRightArrow());
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

// function nextButton(numberToShow, sliderElement) {
//   const sliderItems = sliderElement.querySelectorAll('.slider__item_comment');
  
//   console.log(sliderItems);
//   let currentIndex = 0;

//   const showSliderItems = () => {
//     sliderItems.forEach((item, index) => {
//       if (index >= currentIndex && index < currentIndex + numberToShow) {
//         item.style.display = 'block';
//       } else {
//         item.style.display = 'none';
//       }
//     });
//   };

//   const nextButton = document.querySelector("#right_arrow_comment_id-1199");
//   nextButton.addEventListener('click', () => {
//     currentIndex += numberToShow;
//     if (currentIndex >= sliderItems.length) {
//       currentIndex = 0;
//     }
//     showSliderItems();
//   });

//   const prevButton = document.querySelector("#left_arrow_comment_id-1199");
//   prevButton.addEventListener('click', () => {
//     currentIndex -= numberToShow;
//     if (currentIndex < 0) {
//       currentIndex = Math.ceil(sliderItems.length / numberToShow) * numberToShow - numberToShow;
//     }
//     showSliderItems();
//   });

//   // Show the initial three items
//   showSliderItems();
// }

function nextButton(windowWidth, sliderElement) {
  const numberToShow = getNumberToShow(windowWidth)
  const sliderItems = sliderElement.querySelectorAll('.slider__item_comment');
  let currentIndex = 0;

  const showSliderItems = () => {
    sliderItems.forEach((item, index) => {
      if (index >= currentIndex && index < currentIndex + numberToShow) {
        item.style.display = 'block';
        item.style.transition = 'opacity 1s';
        item.style.opacity = 1;
      } else {
        item.style.display = 'none';
        item.style.opacity = 0;
      }
    });
  };

  const nextButton = document.querySelector("#right_arrow_comment_id-" + getScreenSizeComment(windowWidth));
  nextButton.addEventListener('click', () => {
    currentIndex += numberToShow;
    if (currentIndex >= sliderItems.length) {
      currentIndex = 0;
    }
    sliderElement.classList.add('slide-next');
    showSliderItems();
    setTimeout(() => sliderElement.classList.remove('slide-next'), 500);
  });
  const prevButton = document.querySelector("#left_arrow_comment_id-" + getScreenSizeComment(windowWidth));
  // console.log(getScreenSize(windowWidth));
  
  prevButton.addEventListener('click', () => {
    currentIndex -= numberToShow;
    if (currentIndex < 0) {
      currentIndex = Math.ceil(sliderItems.length / numberToShow) * numberToShow - numberToShow;
    }
    sliderElement.classList.add('slide-previous');
    showSliderItems();
    setTimeout(() => sliderElement.classList.remove('slide-previous'), 500);
  });
  
  // Show the initial slides
  showSliderItems();
}

const form = document.querySelector('#commentForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fullname = document.querySelector('#fullname').value;
  const comment = document.querySelector('#comment').value;
  // Send POST request
  fetch('http://ec2-54-162-210-174.compute-1.amazonaws.com:8080/comments', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      author: fullname,
      comment: comment,
      date: new Date(),
    }),
  })
    .then(response => {
      getComments();
      document.querySelector('#fullname').value = '';
      document.querySelector('#comment').value = '';
    })
    .catch(error => {
      // Handle the error here
    });
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