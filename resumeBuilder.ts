// Import the html2pdf library
import html2pdf from 'html2pdf.js';

// The bullet template
const bulletPlaceholder = '• ';

// Initialized the textareas with bullets
function initializeTextareasWithBullets(): void {
  const educationTextarea = document.getElementById('education') as HTMLTextAreaElement;
  const skillsTextarea = document.getElementById('skills') as HTMLTextAreaElement;
  const workExperienceTextarea = document.getElementById('workExperience') as HTMLTextAreaElement;

  // Adding bullets as the initial content for each textarea
  if (educationTextarea) educationTextarea.value = generateBullets(4);
  if (skillsTextarea) skillsTextarea.value = generateBullets(4);
  if (workExperienceTextarea) workExperienceTextarea.value = generateBullets(4);
}

// Generates the initial content for multiple rows with bullets
function generateBullets(rows: number): string {
  let bullets = '';
  for (let i = 0; i < rows; i++) {
    bullets += '• \n'; // Bullet followed by a newline
  }
  return bullets.trim(); // Trim the last newline
}

// Prevented the clearing of bullets while typing
function handleBulletInput(event: Event): void {
  const inputValue = (event.target as HTMLTextAreaElement).value;
  const lines = inputValue.split('\n');

  // Ensured each line starts with a bullet (•)
  const newLines = lines.map(line => {
    return line.startsWith('•') ? line : '• ' + line.trim();
  });

  // Updated the textarea content with the bullet-corrected lines
  (event.target as HTMLTextAreaElement).value = newLines.join('\n');
}

// Initialized the textareas with bullets when the page loads
window.onload = initializeTextareasWithBullets;

// Attached event listeners to prevent bullet clearing
const educationTextarea = document.getElementById('education');
const skillsTextarea = document.getElementById('skills');
const workExperienceTextarea = document.getElementById('workExperience');

educationTextarea?.addEventListener('input', handleBulletInput);
skillsTextarea?.addEventListener('input', handleBulletInput);
workExperienceTextarea?.addEventListener('input', handleBulletInput);

// Handled form submission to generate the resume
const resumeForm = document.getElementById('resumeForm');
resumeForm?.addEventListener('submit', function (event: Event) {
  event.preventDefault(); // Prevent form submission and page reload

  // Got values from the form fields
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value
    .split('\n')
    .map(line => `<li>${line}</li>`)
    .join('');
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value
    .split('\n')
    .map(line => `<li>${line}</li>`)
    .join('');
  const workExperience = (document.getElementById('workExperience') as HTMLTextAreaElement).value
    .split('\n')
    .map(line => `<li>${line}</li>`)
    .join('');

  // Generating the resume content
  const resumeContent = `
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

  const resumeDiv = document.getElementById('resume');
  if (resumeDiv) {
    resumeDiv.innerHTML = resumeContent; // Display the generated resume
  }

  // Showed the "Download as PDF" button
  const downloadButton = document.getElementById('download-btn');
  if (downloadButton) {
    downloadButton.style.display = 'inline-block';
    downloadButton.onclick = function () {
      // Used html2pdf to generate the PDF with custom margin
      const element = document.getElementById('resume');
      if (element) {
        const opt = {
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
