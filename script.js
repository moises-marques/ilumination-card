// Dados de contato (PERSONALIZE AQUI)
const contactData = {
    telefone: {
        icon: '📱',
        title: 'Telefone',
        info: '+55 (92) 98106-7373',
        action: 'Ligar Agora',
        link: 'tel:+5592981067373'
    },
    email: {
        icon: '📧',
        title: 'E-mail',
        info: 'mpm10433@gmail.com',
        action: 'Enviar E-mail',
        link: 'mailto:mpm10433@gmail.com'
    },
    whatsapp: {
        icon: '💬',
        title: 'WhatsApp',
        info: '+55 (92) 98106-7373',
        action: 'Abrir WhatsApp',
        link: 'https://wa.me/5592981067373'
    },
    website: {
        icon: '🌐',
        title: 'Portifólio',
        info: 'www.Portifólio.com.br',
        action: 'Visitar Site',
        link: 'https://39267c6f.portfo-moises.pages.dev/'
    },
    endereco: {
    icon: '📍',
    title: 'Endereço',
    info: 'Rua I 1, 15 - Nova Cidade, Manaus - AM',
    action: 'Ver no Mapa',
    link: 'https://www.google.com/maps/place/R.+I+1,+15+-+Nova+Cidade,+Manaus+-+AM,+69097-360'
    },
    servico: {
        icon: '💼',
        title: 'Site',
        info: 'serviço',
        action: 'Conectar',
        link: 'https://b431f3cf.landing-apost-moises.pages.dev/'
    }
};

// Esquemas de cores para as bordas iluminadas
const colorSchemes = {
    rainbow: {
        colors: ['#667eea', '#764ba2', '#f093fb'],
        name: 'Arco-íris'
    },
    blue: {
        colors: ['#00d4ff', '#0099ff', '#0066ff'],
        name: 'Azul'
    },
    purple: {
        colors: ['#a855f7', '#8b5cf6', '#6366f1'],
        name: 'Roxo'
    },
    green: {
        colors: ['#00ff88', '#00cc66', '#00aa44'],
        name: 'Verde'
    }
};

// Elementos do DOM
const infoButtons = document.querySelectorAll('.info-btn');
const modal = document.getElementById('infoModal');
const closeModalBtn = document.getElementById('closeModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalInfo = document.getElementById('modalInfo');
const actionBtn = document.getElementById('actionBtn');
const colorButtons = document.querySelectorAll('.color-btn');
const glowBorders = document.querySelectorAll('.glow-border');
const photoFrame = document.querySelector('.photo-frame');

// Variável para armazenar o link atual
let currentLink = '';

// Adicionar eventos aos botões de informação
infoButtons.forEach(button => {
    button.addEventListener('click', function() {
        const infoType = this.getAttribute('data-info');
        const data = contactData[infoType];
        
        if (data) {
            // Preencher o modal com as informações
            modalIcon.textContent = data.icon;
            modalTitle.textContent = data.title;
            modalInfo.textContent = data.info;
            actionBtn.textContent = data.action;
            currentLink = data.link;
            
            // Mostrar o modal
            modal.classList.add('active');
            
            // Adicionar animação de entrada
            document.querySelector('.modal-content').style.animation = 'slideUp 0.3s ease';
        }
    });
});

// Fechar modal ao clicar no X
closeModalBtn.addEventListener('click', closeModal);

// Fechar modal ao clicar fora do conteúdo
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Função para fechar o modal
function closeModal() {
    modal.classList.remove('active');
}

// Ação do botão no modal
actionBtn.addEventListener('click', function() {
    if (currentLink) {
        window.open(currentLink, '_blank');
    }
});

// Trocar esquema de cores
colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        const colorScheme = this.getAttribute('data-color');
        changeColorScheme(colorScheme);
        
        // Feedback visual
        colorButtons.forEach(btn => btn.style.opacity = '0.6');
        this.style.opacity = '1';
    });
});

// Função para mudar o esquema de cores
function changeColorScheme(scheme) {
    const colors = colorSchemes[scheme].colors;
    
    // Criar gradiente com as 3 cores
    const gradient = `linear-gradient(90deg, 
        ${colors[0]} 0%, 
        ${colors[1]} 33%, 
        ${colors[2]} 66%, 
        ${colors[0]} 100%)`;
    
    // Aplicar nas bordas horizontais
    glowBorders[0].style.background = gradient; // top
    glowBorders[2].style.background = gradient; // bottom
    
    // Aplicar nas bordas verticais
    const verticalGradient = `linear-gradient(180deg, 
        ${colors[0]} 0%, 
        ${colors[1]} 33%, 
        ${colors[2]} 66%, 
        ${colors[0]} 100%)`;
    
    glowBorders[1].style.background = verticalGradient; // right
    glowBorders[3].style.background = verticalGradient; // left
    
    // Aplicar na moldura da foto
    photoFrame.style.background = gradient;
    
    // Atualizar sombra dos botões no hover
    updateButtonHoverColors(colors[0]);
}

// Atualizar cores de hover dos botões
function updateButtonHoverColors(primaryColor) {
    const style = document.createElement('style');
    style.innerHTML = `
        .info-btn:hover {
            box-shadow: 0 8px 25px ${primaryColor}66, inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Animação suave ao carregar a página
window.addEventListener('load', function() {
    const card = document.querySelector('.business-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});

// Efeito de partículas ao clicar nos botões (opcional)
infoButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        createRipple(e, this);
    });
});

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Adicionar animação de ripple ao CSS dinamicamente
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Detectar orientação do dispositivo para ajustes responsivos
window.addEventListener('resize', function() {
    adjustLayoutForScreenSize();
});

function adjustLayoutForScreenSize() {
    const width = window.innerWidth;
    const buttonsSection = document.querySelector('.buttons-section');
    
    if (width <= 480) {
        buttonsSection.style.gridTemplateColumns = '1fr';
    } else {
        buttonsSection.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
}

// Inicializar layout responsivo
adjustLayoutForScreenSize();

// Console log para debug (remover em produção)
console.log('🎨 Cartão Digital Interativo carregado com sucesso!');
console.log('💡 Para personalizar, edite os dados em contactData no início do arquivo JavaScript');