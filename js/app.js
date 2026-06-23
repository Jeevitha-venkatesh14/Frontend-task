document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 2. Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 3. Form Validation
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';

        if (!name.value.trim()) { document.getElementById('nameError').textContent = 'Name is required.'; valid = false; }
        if (!email.value.trim() || !email.value.includes('@')) { document.getElementById('emailError').textContent = 'Valid email is required.'; valid = false; }
        if (!message.value.trim()) { document.getElementById('messageError').textContent = 'Message is required.'; valid = false; }

        if (valid) { alert('Form Submitted!'); form.reset(); }
    });

    // 4. API Integration (Bonus)
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '<div class="state-msg">Loading updates...</div>';
    
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
        .then(res => res.json())
        .then(posts => {
            blogContainer.innerHTML = '';
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<h3>${post.title.substring(0,25)}</h3><p>${post.body.substring(0,80)}</p>`;
                blogContainer.appendChild(card);
            });
        })
        .catch(() => {
            blogContainer.innerHTML = '<div class="state-msg" style="color:red">Failed to load posts.</div>';
        });
});