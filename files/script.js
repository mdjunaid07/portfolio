
var typed = new Typed(".text", {
    strings: ["Programming" , "Cybersecurity" , "Web Development", "Artificial Intelligence"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});


const toTop = document.querySelector(".top");
window.addEventListener("scroll",() =>{
    if (window.pageYOffset > 100){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }
})

// Contact Form Submission Logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        submitBtn.innerText = 'Sending...';

        try {
            const res = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, message })
            });

            const data = await res.json();

            if (res.ok) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#0ef';
                formMessage.innerText = 'Message sent successfully!';
                contactForm.reset();
            } else {
                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
                formMessage.innerText = data.message || 'Error sending message.';
            }
        } catch (error) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.innerText = 'Could not reach server.';
        }

        submitBtn.innerText = 'Send Message';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}