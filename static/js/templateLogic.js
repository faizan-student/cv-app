let templateDesign = 1;


document.querySelectorAll('.template-preview img').forEach((img, index) => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('templateModal');
    const modalImage = document.getElementById('modalImage');


    modal.classList.add('show');
    modalImage.src = img.src;


    templateDesign = index + 1;


    history.pushState(null, '', `/get-resume/?template=${templateDesign}`);
  });
});


document.getElementById('templateModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('show');
  }
});


document.querySelector('.customize-btn').addEventListener('click', () => {

  if (templateDesign === 1) {
    fetchTemplateAndApply('creative-1-16.html');
  } else if (templateDesign === 2) {
    fetchTemplateAndApply('basic-1-1.html');
  } else if (templateDesign === 3) {
    fetchTemplateAndApply('professional-14-16.html');
  } else if (templateDesign === 4) {
    fetchTemplateAndApply('creative-4-16.html');
  }


  document.getElementById('templateModal').classList.remove('show');
});


function fetchTemplateAndApply(templateName) {
  fetch(`/get-resume/?template=${templateDesign}`)
    .then(response => response.text())
    .then(data => {
      document.querySelector('.document-area').innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching template:', error);
    });
}
