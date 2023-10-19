  const targetmodal = document.querySelector('.modal-display-wrapper');
  const target = document.querySelectorAll('.modal-image');
  const closeBtn = document.querySelector('.close-btn');

  window.addEventListener('load', () => {
    
    target.forEach(function(e){
      e.addEventListener('click', () => {
        targetmodal.querySelector('img').src=e.src;
        targetmodal.classList.add('active');
    });
    });
  });
  closeBtn.addEventListener('click', () => {
    targetmodal.classList.remove('active');
  });
  
  targetmodal.addEventListener('click', () => {
    targetmodal.classList.remove('active');
  });