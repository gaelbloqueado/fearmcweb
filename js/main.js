document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Fake player count for demo purposes
function updatePlayerCount() {
    const onlinePlayers = document.getElementById('online-players');
    const serverIP = 'fearmc.xyz'; 

    fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                const playerCount = data.players.online; 
                onlinePlayers.textContent = `${playerCount}/100`; 
            } else {
                onlinePlayers.textContent = 'Servidor fuera de línea';
            }
        })
        .catch(error => {
            console.error('Error al obtener el contador de jugadores:', error);
            onlinePlayers.textContent = 'Error al obtener datos';
        });

    // 5 seconds
    setTimeout(updatePlayerCount, 5000);
}

updatePlayerCount();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-up, .fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

//text  
const textos = ["El mejor servidor", "Tu mejor experencia", "¡FearMC OnTop!"];
let i = 0;
let j = 0;
let escribiendo = true;
const velocidad = 100;
const textoElemento = document.getElementById("texto");

function escribirBorrar() {
  const textoActual = textos[i];

  if (escribiendo) {
    textoElemento.textContent = textoActual.slice(0, j++);
    if (j > textoActual.length) {
      escribiendo = false;
      setTimeout(escribirBorrar, 2000); 
      return;
    }
  } else {
    textoElemento.textContent = textoActual.slice(0, --j);
    if (j === 0) {
      escribiendo = true;
      i = (i + 1) % textos.length;
    }
  }

  setTimeout(escribirBorrar, velocidad);
}

escribirBorrar();


  window.addEventListener('load', () => {
    const toast = document.getElementById('welcome-toast');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  });

// Webhook de Discord
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('discord-support-form');
    
    if (supportForm) {
        supportForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('support-status');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            statusDiv.textContent = '';
            statusDiv.className = 'support-status';

            const formData = {
                email: document.getElementById('support-email').value,
                mcname: document.getElementById('support-mcname').value,
                discord: document.getElementById('support-discord').value,
                message: document.getElementById('support-message').value
            };
            
            try {
                const webhookURL = 'https://discord.com/api/webhooks/1372276962206158961/iELPTP2ZFmwOVZUKadoBVz4x8MpROLSFNjbPulaj_9oIXY8G0DC0NrBTilz9j8-Z7eV7';
                
                const discordMessage = {
                    username: 'FearMC Support',
                    avatar_url: 'https://tusitio.com/assets/logo.png',
                    embeds: [{
                        title: 'Nueva Solicitud de Soporte',
                        color: 0x8b0000, 
                        fields: [
                            {
                                name: 'Correo Electrónico',
                                value: formData.email || "No proporcionado",
                                inline: true
                            },
                            {
                                name: 'Usuario de Minecraft',
                                value: formData.mcname,
                                inline: true
                            },
                            {
                                name: 'Usuario de Discord',
                                value: formData.discord,
                                inline: true
                            },
                            {
                                name: 'Mensaje',
                                value: formData.message
                            }
                        ],
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: 'FearMC Support System'
                        }
                    }]
                };

                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discordMessage),
                });
                
                if (response.ok) {
                    statusDiv.innerHTML = '<div class="success-animation">✓</div> <span>Solicitud enviada correctamente</span>';
                    statusDiv.className = 'support-status success';
                    supportForm.reset();

                    setTimeout(() => {
                        closeSupportModal();
                    }, 3000);
                } else {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                statusDiv.textContent = '❌ Error al enviar: ' + error.message;
                statusDiv.className = 'support-status error';
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Soporte modal functions
const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');

function openSupportModal() {
    supportModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeSupportModal() {
    supportModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Event listeners for support modal
if (supportBtn && supportModal) {
    supportBtn.addEventListener('click', openSupportModal);
    
    // Close modal when clicking outside of it
    supportModal.addEventListener('click', function(e) {
        if (e.target === supportModal) {
            closeSupportModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && supportModal.style.display === 'flex') {
            closeSupportModal();
        }
    });
}