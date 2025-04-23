document.getElementById('portfolioForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const bio = document.getElementById('bio').value.trim();
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(Boolean);
  const projects = document.getElementById('projects').value.trim().split('\n').map(p => {
    const [title, url] = p.split(':');
    return { title: title?.trim(), url: url?.trim() };
  }).filter(p => p.title && p.url);

  const htmlParts = [];

  htmlParts.push(`<!DOCTYPE html>`);
  htmlParts.push(`<html lang="en">`);
  htmlParts.push(`<head>`);
  htmlParts.push(`<meta charset="UTF-8" />`);
  htmlParts.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`);
  htmlParts.push(`<title>${name}'s Portfolio</title>`);
  htmlParts.push(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">`);
  htmlParts.push(`</head>`);
  htmlParts.push(`<body style="padding: 2rem; background: #f0f2f5;">`);
  htmlParts.push(`<div class="container">`);
  htmlParts.push(`<h1 class="text-center">${name}</h1>`);
  htmlParts.push(`<p class="lead text-center">${bio}</p>`);
  
  htmlParts.push(`<h3>Skills</h3>`);
  htmlParts.push(`<ul class="list-group mb-4">`);
  skills.forEach(skill => {
    htmlParts.push(`<li class="list-group-item">${skill}</li>`);
  });
  htmlParts.push(`</ul>`);

  htmlParts.push(`<h3>Projects</h3>`);
  htmlParts.push(`<ul class="list-group">`);
  projects.forEach(p => {
    htmlParts.push(`<li class="list-group-item"><a href="${p.url}" target="_blank">${p.title}</a></li>`);
  });
  htmlParts.push(`</ul>`);

  htmlParts.push(`</div></body></html>`);

  const finalHTML = htmlParts.join('\n');
  const blob = new Blob([finalHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  document.getElementById('output').innerHTML = `
    <a href="${url}" class="btn btn-success" download="portfolio.html">Download Portfolio</a>
    <iframe src="${url}" style="width:100%;height:400px;border:1px solid #ccc;margin-top:1rem;"></iframe>
  `;
});
