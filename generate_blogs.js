const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, 'activities', 'js', 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

// A crude way to extract the BLOGS array from the JS file
const blogsMatch = dataJsContent.match(/const BLOGS = (\[[\s\S]*?\]);/);
if (!blogsMatch) {
  console.error("Could not find BLOGS array in data.js");
  process.exit(1);
}

let BLOGS;
try {
  BLOGS = eval(blogsMatch[1]);
} catch (e) {
  console.error("Error parsing BLOGS array:", e);
  process.exit(1);
}

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const blogDir = path.join(__dirname, 'blog');

BLOGS.forEach(blog => {
  const slug = generateSlug(blog.title);
  const fileName = `${slug}.html`;
  const filePath = path.join(blogDir, fileName);
  const readTime = Math.ceil(blog.content.split(' ').length / 200) || 3;

  // Find 3 related blogs
  const related = [...BLOGS]
    .filter(b => b.id !== blog.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  let relatedHtml = related.map(rel => {
    const relSlug = generateSlug(rel.title) + '.html';
    const relReadTime = Math.ceil(rel.content.split(' ').length / 200) || 3;
    return `
        <a href="${relSlug}" class="blog-card flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer block">
          <div class="h-48 overflow-hidden relative">
            <img src="${rel.image}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-primary shadow-sm">
              Article
            </span>
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>By ${rel.author.split(' ')[0]}</span>
                <span>${rel.date} • ${relReadTime} min read</span>
              </div>
              <h3 class="font-bold text-lg text-slate-900 leading-tight group-hover:text-primary transition-colors font-display">${rel.title}</h3>
            </div>
            <div class="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Read article</span>
              <span class="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
            </div>
          </div>
        </a>
    `;
  }).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="text-md">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="../assets/images/web/logo.png">
  <title>${blog.title} | NSS Vettathur</title>
  
  <meta name="description" content="${blog.summary.replace(/"/g, '&quot;')}">
  <link rel="canonical" href="https://nss-vettathur.techora.in/blog/${slug}.html">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${blog.title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${blog.summary.replace(/"/g, '&quot;')}">
  <meta property="og:image" content="${blog.image}">
  <meta property="og:url" content="https://nss-vettathur.techora.in/blog/${slug}.html">
  <meta property="og:type" content="article">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${blog.title.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${blog.summary.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${blog.image}">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${blog.title.replace(/"/g, '\\"')}",
    "image": "${blog.image}",
    "datePublished": "${blog.date}",
    "author": {
      "@type": "Person",
      "name": "${blog.author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NSS Vettathur",
      "url": "https://nss-vettathur.techora.in/"
    },
    "description": "${blog.summary.replace(/"/g, '\\"')}"
  }
  </script>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#1E3A8A',
            secondary: '#EA580C',
            accent: '#F59E0B',
            success: '#16A34A'
          },
          fontFamily: {
            display: ['Outfit', 'sans-serif'],
            body: ['Inter', 'sans-serif']
          }
        }
      }
    }
  </script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="../style.css">
  <script src="../activities/js/theme.js"></script>
</head>
<body class="bg-white text-slate-800 transition-colors duration-300 font-body">

  <!-- Header Navigation -->
  <header class="sticky top-0 z-50 w-full transition-all duration-300 border-b border-slate-100 bg-white/80 backdrop-blur-md">
    <div class="w-full bg-slate-50 border-b border-slate-100 text-xs py-1.5 px-4 md:px-8 flex justify-between items-center text-slate-500">
      <div>
        <span>Motto: <strong class="text-secondary">Not Me But You</strong></span>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1 border-r border-slate-200 pr-3">
          <span class="mr-1 hidden sm:inline">Text Size:</span>
          <button id="btn-text-dec" class="px-2 py-0.5 hover:bg-slate-200 rounded font-bold cursor-pointer">A-</button>
          <button id="btn-text-rst" class="px-2 py-0.5 hover:bg-slate-200 rounded font-bold cursor-pointer">A</button>
          <button id="btn-text-inc" class="px-2 py-0.5 hover:bg-slate-200 rounded font-bold cursor-pointer">A+</button>
        </div>
        <button id="theme-toggle" class="p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer" aria-label="Toggle Dark Mode">
          <svg id="theme-toggle-dark-icon" class="hidden w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          <svg id="theme-toggle-light-icon" class="hidden w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
      <a href="../index.html" class="flex items-center gap-3 group">
        <img src="../assets/images/web/logo.png" alt="NSS Logo" class="w-10 h-10 object-cover rounded-full shadow-md">
        <div>
          <span class="font-bold text-lg text-slate-800 block tracking-tight leading-tight group-hover:text-primary transition-colors font-display">NSS VETTATHUR</span>
          <span class="text-[10px] uppercase font-semibold text-slate-400 tracking-widest block leading-none">Unit:NSS/SFU/HSE/MPM/81</span>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-600">
        <a href="../index.html" class="hover:text-primary transition-colors py-2">Home</a>
        <a href="../about.html" class="hover:text-primary transition-colors py-2">About</a>
        <a href="../activities/activities.html" class="hover:text-primary transition-colors py-2">Activities</a>
        <a href="../gallery.html" class="hover:text-primary transition-colors py-2">Gallery</a>
        <a href="../achievements.html" class="hover:text-primary transition-colors py-2">Achievements</a>
        <a href="../news.html" class="hover:text-primary transition-colors py-2">News</a>
        <a href="index.html" class="text-primary font-bold py-2 border-b-2 border-primary">Blogs</a>
        <a href="../team.html" class="hover:text-primary transition-colors py-2">Team</a>
        <a href="../volanteer/volunteer.html" class="px-4 py-3 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors">Volunteers</a>
        <a href="../index.html#contact" class="hover:text-primary transition-colors py-2">Contact</a>
      </nav>
      <button id="mobile-menu-btn" class="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
  </header>

  <!-- Article Hero -->
  <section class="bg-slate-50 py-12 border-b border-slate-100">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <div class="mb-6">
        <a href="index.html" class="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Blogs
        </a>
      </div>
      <div class="space-y-4">
        <span class="inline-block px-3 py-1 bg-white border border-slate-200 text-primary text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">Article</span>
        <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight font-display animate-slide-up">${blog.title}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 pt-2">
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            ${blog.author}
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            ${blog.date}
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${readTime} min read
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <article class="max-w-4xl mx-auto px-4 md:px-8 py-12">
    <div class="rounded-3xl overflow-hidden shadow-xl mb-12 h-64 md:h-[400px]">
      <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover">
    </div>
    
    <div class="prose prose-slate max-w-none prose-lg md:prose-xl prose-headings:font-display prose-headings:font-bold prose-a:text-primary whitespace-pre-wrap leading-relaxed text-slate-700">
      ${blog.content}
    </div>

    ${blog.sourceUrl ? `
    <div class="mt-12 pt-8 border-t border-slate-100">
      <a href="${blog.sourceUrl}" target="_blank" rel="noopener" class="inline-flex items-center px-6 py-3 bg-slate-50 text-secondary border border-slate-200 hover:bg-slate-100 hover:border-slate-300 font-bold text-sm rounded-xl transition-colors shadow-sm">
        ${blog.sourceLabel || "Visit Source"}
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
    </div>` : ''}
  </article>

  <!-- Related Blogs -->
  <section class="bg-slate-50 py-16 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-8">Related Articles</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${relatedHtml}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="w-full bg-secondary text-slate-100 border-t border-blue-900 py-12 px-4 md:px-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img src="../assets/images/web/logo.png" alt="NSS Logo" class="w-8 h-8 object-cover rounded-full">
          <span class="font-bold text-white tracking-wide text-lg font-display">NSS VETTATHUR</span>
        </div>
        <p class="text-sm text-slate-200 leading-relaxed mb-4">
          The National Service Scheme (NSS) Unit of Vettathur, Kerala. Promoting active community leadership, social empathy, and volunteer action since inception.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-white text-base mb-4 tracking-wide font-display">Quick Links</h3>
        <ul class="space-y-2.5 text-sm">
          <li><a href="../about.html" class="hover:text-accent transition-colors">About NSS</a></li>
          <li><a href="../activities/activities.html" class="hover:text-accent transition-colors">Activities</a></li>
          <li><a href="../gallery.html" class="hover:text-accent transition-colors">Gallery</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-white text-base mb-4 tracking-wide font-display">Resources</h3>
        <ul class="space-y-2.5 text-sm">
          <li><a href="index.html" class="hover:text-accent transition-colors">Blog</a></li>
          <li><a href="../index.html#contact" class="hover:text-accent transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-white text-base mb-4 tracking-wide font-display">Contact Unit</h3>
        <p class="text-sm text-slate-200 mb-2">Email: <a href="mailto:diginss376@gmail.com" class="hover:text-accent text-slate-300">diginss376@gmail.com</a></p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-xs text-slate-300 text-center">
      &copy; 2026 Created by techora.in. All rights reserved.
    </div>
  </footer>
</body>
</html>`;

  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated ${fileName}`);
});
