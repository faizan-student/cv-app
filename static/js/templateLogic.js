// Variable to store the selected template number
let templateDesign = 1;

// Add Event Listener to Template Preview Images
document.querySelectorAll('.template-preview img').forEach((img, index) => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('templateModal');
    const modalImage = document.getElementById('modalImage');

    // Display the modal with the corresponding template image
    modal.classList.add('show');
    modalImage.src = img.src;  // Display the clicked template image

    // Set templateDesign value based on clicked template
    templateDesign = index + 1;

    // Update the URL with the template selection without reloading the page
    history.pushState(null, '', `/get-resume/?template=${templateDesign}`);
  });
});

// Close Modal when clicking outside the modal
document.getElementById('templateModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('show');
  }
});

// Customize button click event to add the template to the document area
document.querySelector('.customize-btn').addEventListener('click', () => {
  // Check templateDesign value and insert the appropriate template
  if (templateDesign === 1) {
    fetchTemplateAndApply('creative-1-16.html');
  } else if (templateDesign === 2) {
    fetchTemplateAndApply('basic-1-1.html');
  } else if (templateDesign === 3) {
    fetchTemplateAndApply('professional-14-16.html');
  } else if (templateDesign === 4) {
    fetchTemplateAndApply('creative-4-16.html');
  }

  // Close the modal after applying the template
  document.getElementById('templateModal').classList.remove('show');
});

// Function to fetch template HTML and apply it to the document area
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
