document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    function toggleTheme() {
        document.body.parentElement.setAttribute(
            'data-theme',
            document.body.parentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
    
    themeToggle.addEventListener('click', toggleTheme);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fix About section visibility
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.classList.add('visible');
    }

    // Project tabs functionality with fixed content
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectsContainer = document.querySelector('.projects-grid');
    
    const projectsContent = `
    <div class="project-card">
        <img src="/lovable-uploads/26c94dbb-bbd4-4122-aa84-4f37e7fea4b6.png" alt="Aritmatika Solver">
        <div class="project-info">
            <h3>Aritmatika Solver</h3>
            <p>Program ini dirancang untuk mempermudah pengguna dalam menyelesaikan soal-soal Aritmatika secara otomatis.</p>
            <div class="project-links">
                <a href="https://aritmatika-solver.vercel.app" target="_blank" class="btn small">Live Demo</a>
                <a href="/project-detail.html?project=aritmatika" class="btn small secondary">Details</a>
            </div>
        </div>
    </div>
    <div class="project-card">
        <img src="/lovable-uploads/26c94dbb-bbd4-4122-aa84-4f37e7fea4b6.png" alt="AutoChat-Discord">
        <div class="project-info">
            <h3>AutoChat-Discord</h3>
            <p>AutoChat adalah solusi otomatisasi untuk mengirim pesan ke saluran Discord secara terjadwal.</p>
            <div class="project-links">
                <a href="https://autochat-discord.vercel.app" target="_blank" class="btn small">Live Demo</a>
                <a href="/project-detail.html?project=autochat" class="btn small secondary">Details</a>
            </div>
        </div>
    </div>
`;

    const certificatesContent = `
        <div class="project-card">
            <img src="certificate1.jpg" alt="Web Development Certificate">
            <div class="project-info">
                <h3>Web Development Certificate</h3>
                <p>Sertifikasi pengembangan web dari platform terkemuka.</p>
            </div>
        </div>
    `;

    const techStackContent = `
        <div class="project-card">
            <div class="project-info">
                <h3>Frontend Technologies</h3>
                <p>HTML5, CSS3, JavaScript, React, Node.js</p>
            </div>
        </div>
    `;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            switch(tab) {
                case 'projects':
                    projectsContainer.innerHTML = projectsContent;
                    break;
                case 'certificates':
                    projectsContainer.innerHTML = certificatesContent;
                    break;
                case 'tech-stack':
                    projectsContainer.innerHTML = techStackContent;
                    break;
            }

            // Re-add visibility class to new cards
            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('visible');
            });
        });
    });

    // Initialize with projects content
    if (projectsContainer) {
        projectsContainer.innerHTML = projectsContent;
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('visible');
        });
    }

    // Social links functionality
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const socialType = link.classList[1];
            let url = '#';
            
            switch(socialType) {
                case 'linkedin':
                    url = 'https://www.linkedin.com/in/your-profile';
                    break;
                case 'instagram':
                    url = 'https://www.instagram.com/ekizr_';
                    break;
                case 'youtube':
                    url = 'https://www.youtube.com/@ekizulfar';
                    break;
                case 'github':
                    url = 'https://github.com/EkiZR';
                    break;
                case 'tiktok':
                    url = 'https://www.tiktok.com/@eki_zulfar';
                    break;
            }
            
            window.open(url, '_blank');
        });
    });

    // Handle CV download
    const downloadCvBtn = document.querySelector('.about-buttons .btn.primary');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace 'cv.pdf' with your actual CV file path
            const cvUrl = '/lovable-uploads/cv.pdf';
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'Eki_Zulfar_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Comments functionality
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.querySelector('.comment-form');
    const commentName = document.getElementById('comment-name');
    const commentMessage = document.getElementById('comment-message');
    const commentCount = document.getElementById('comment-count');
    const profilePhotoInput = document.getElementById('profile-photo');
    let selectedImage = null;

    // Handle image selection
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    selectedImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Load existing comments from localStorage
    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        if (commentsContainer) {
            commentsContainer.innerHTML = comments.map(comment => `
                <div class="comment">
                    <div class="comment-content">
                        <strong>${comment.name}</strong>
                        <p>${comment.message}</p>
                        ${comment.image ? `<img src="${comment.image}" alt="Comment image">` : ''}
                    </div>
                </div>
            `).join('');
            
            if (commentCount) {
                commentCount.textContent = `(${comments.length})`;
            }
        }
    };

    // Add new comment
    const postComment = document.getElementById('post-comment');
    if (postComment) {
        postComment.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (commentName && commentMessage) {
                const newComment = {
                    name: commentName.value,
                    message: commentMessage.value,
                    image: selectedImage,
                    timestamp: new Date().toISOString()
                };

                const comments = JSON.parse(localStorage.getItem('comments') || '[]');
                comments.push(newComment);
                localStorage.setItem('comments', JSON.stringify(comments));

                // Reset form
                commentName.value = '';
                commentMessage.value = '';
                if (profilePhotoInput) {
                    profilePhotoInput.value = '';
                }
                selectedImage = null;

                // Reload comments
                loadComments();
            }
        });
    }

    // Initial load of comments
    loadComments();
});
