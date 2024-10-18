// Define the bullet template
const bulletPlaceholder = '• ';

function initializeTextareasWithBullets() {
  const educationTextarea = document.getElementById('education');
  const skillsTextarea = document.getElementById('skills');
  const workExperienceTextarea = document.getElementById('workExperience');

  // Add bullets as the initial content for each textarea
  educationTextarea.value = generateBullets(4);
  skillsTextarea.value = generateBullets(4);
  workExperienceTextarea.value = generateBullets(4);
}

// Generates the initial content for multiple rows with bullets
function generateBullets(rows) {
  let bullets = '';
  for (let i = 0; i < rows; i++) {
    bullets += '• \n'; // Bullet followed by a newline
  }
  return bullets.trim(); // Trim the last newline
}

// Initialize the textareas with bullets when the page loads
window.onload = initializeTextareasWithBullets;

// Prevent the clearing of bullets while typing
document.getElementById('education').addEventListener('input', handleBulletInput);
document.getElementById('skills').addEventListener('input', handleBulletInput);
document.getElementById('workExperience').addEventListener('input', handleBulletInput);

function handleBulletInput(event) {
  const inputValue = event.target.value;
  const lines = inputValue.split('\n');

  // Ensure each line starts with a bullet (•)
  const newLines = lines.map(line => {
    return line.startsWith('•') ? line : '• ' + line.trim();
  });

  // Update the textarea content with the bullet-corrected lines
  event.target.value = newLines.join('\n');
}

// Handle form submission to generate resume
var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission and page reload

  // Get values from the form fields
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var education = document.getElementById('education').value.split('\n').map(line => `<li>${line}</li>`).join('');
  var skills = document.getElementById('skills').value.split('\n').map(line => `<li>${line}</li>`).join('');
  var workExperience = document.getElementById('workExperience').value.split('\n').map(line => `<li>${line}</li>`).join('');

  // Generate the resume content
  var resumeContent = `
    <h2 style="font-size: 18px;"><u>Generated Resume</u></h2>
    <p style="font-size: 14px;"><strong>Name:</strong> ${name}</p>
    <p style="font-size: 14px;"><strong>Email:</strong> ${email}</p>
    <p style="font-size: 14px;"><strong>Phone:</strong> ${phone}</p>

    <p style="font-size: 14px;"><strong>Education:</strong></p>
    <ul style="font-size: 14px; max-width: 500px; padding: 0px 20px 0px 0px; word-wrap: break-word; word-break: break-word;">${education}</ul>
    
    <p style="font-size: 14px;"><strong>Skills:</strong> </p>
    <ul style="font-size: 14px; max-width: 500px; padding: 0px 20px 0px 0px; word-wrap: break-word; word-break: break-word;">${skills}</ul>

    <p style="font-size: 14px;"><strong>Work Experience:</strong></p>
    <ul style="font-size: 14px; max-width: 500px; padding: 0px 20px 0px 0px; word-wrap: break-word; word-break: break-word;">${workExperience}</ul>
  `;

  var resumeDiv = document.getElementById('resume');
  if (resumeDiv) {
    resumeDiv.innerHTML = resumeContent; // Display the generated resume
  }

  // Show the "Download as PDF" button
  var downloadButton = document.getElementById('download-btn');
  if (downloadButton) {
    downloadButton.style.display = 'inline-block';
    downloadButton.onclick = function () {
      // Use html2pdf to generate the PDF with custom margin
      var element = document.getElementById('resume');
      if (element) {
        var opt = {
          margin: [10, 10, 10, 10], // top, right, bottom, left margins (left is 30px)
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
      }
    };
  }
});
