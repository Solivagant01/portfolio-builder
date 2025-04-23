document.getElementById('portfolioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const bio = document.getElementById('bio').value.trim();
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(Boolean);
  const email = document.getElementById('email').value.trim();
  const linkedin = document.getElementById('linkedin').value.trim();
  const github = document.getElementById('github').value.trim();
  const education = document.getElementById('education').value.trim().split('\n').map(e => e.trim()).filter(Boolean);
  
  const projects = document.getElementById('projects').value.trim().split('\n').map(p => {
    const [title, ...urlParts] = p.split(':');
    let url = urlParts.join(':').trim() || '';
    if (url && !/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    return { title: title?.trim(), url };
  }).filter(p => p.title && p.url);

  const htmlParts = [];

  htmlParts.push(`<!DOCTYPE html>`);
  htmlParts.push(`<html lang="en">`);
  htmlParts.push(`<head>`);
  htmlParts.push(`<meta charset="UTF-8" />`);
  htmlParts.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`);
  htmlParts.push(`<title>${name}'s Portfolio</title>`);
  htmlParts.push(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">`);
  htmlParts.push(`<style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #f1f3f5;
    }
    .header {
      background: linear-gradient(135deg, #6a11cb, #2575fc);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
    }
    .header h1 {
      font-size: 2.5rem;
    }
    .container {
      margin-top: -40px;
      background: white;
      border-radius: 20px;
      padding: 2rem;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    .skills span {
      background: #e0f7fa;
      color: #00796b;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    .project-card {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      padding: 1rem;
      border-radius: 15px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .project-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
    .project-card a {
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
    }
    .project-card a:hover {
      text-decoration: underline;
    }
    .contact-info a {
      text-decoration: none;
      color: #007bff;
    }
    .contact-info a:hover {
      text-decoration: underline;
    }
  </style>`);
  htmlParts.push(`</head>`);
  htmlParts.push(`<body>`);
  htmlParts.push(`<div class="header">`);
  htmlParts.push(`<h1>${name}</h1>`);
  htmlParts.push(`<p class="lead">${bio}</p>`);
  htmlParts.push(`</div>`);

  htmlParts.push(`<div class="container">`);

  // Contact Info Section
  htmlParts.push(`<h3>Contact Information</h3>`);
  htmlParts.push(`<div class="contact-info">`);
  if (email) htmlParts.push(`<p>Email: <a href="mailto:${email}">${email}</a></p>`);
  if (linkedin) htmlParts.push(`<p>LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a></p>`);
  if (github) htmlParts.push(`<p>GitHub: <a href="${github}" target="_blank">${github}</a></p>`);
  htmlParts.push(`</div>`);

  // Education Section
  htmlParts.push(`<h3>Education</h3>`);
  if (education.length) {
    htmlParts.push(`<ul>`);
    education.forEach(edu => {
      htmlParts.push(`<li>${edu}</li>`);
    });
    htmlParts.push(`</ul>`);
  }

  // Skills Section
  htmlParts.push(`<h3>Skills</h3>`);
  htmlParts.push(`<div class="skills">`);
  skills.forEach(skill => {
    htmlParts.push(`<span>${skill}</span>`);
  });
  htmlParts.push(`</div>`);

  // Projects Section
  htmlParts.push(`<h3>Projects</h3>`);
  htmlParts.push(`<div class="row g-3">`);
  projects.forEach(p => {
    htmlParts.push(`
      <div class="col-md-6">
        <div class="project-card">
          <a href="${p.url}" target="_blank">${p.title}</a>
        </div>
      </div>
    `);
  });
  htmlParts.push(`</div>`);

  htmlParts.push(`</div></body></html>`);

  const finalHTML = htmlParts.join('\n');
  const blob = new Blob([finalHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  document.getElementById('output').innerHTML = `
    <a href="${url}" class="btn btn-success mt-3" download="portfolio.html">Download Portfolio</a>
    <iframe src="${url}" style="width:100%;height:500px;border:1px solid #ccc;margin-top:1rem;border-radius:12px;"></iframe>
  `;
});
