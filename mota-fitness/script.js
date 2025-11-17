const produtos = [
    { nome: 'Calça Fitness', preco: 150, categoria: 'calcas', imagem: 'assets/calca.jpg' },
    { nome: 'Top Premium', preco: 90, categoria: 'tops', imagem: 'assets/top.jpg' },
    { nome: 'Camiseta Dry Fit', preco: 80, categoria: 'camisetas', imagem: 'assets/camiseta.jpg' },
    { nome: 'Macaquinho Luxo', preco: 200, categoria: 'macaquinhos', imagem: 'assets/macaquinho.jpg' },
    { nome: 'Conjunto Power', preco: 250, categoria: 'conjuntos', imagem: 'assets/conjunto.jpg' },
    { nome: 'Bermuda Pro', preco: 120, categoria: 'bermudas', imagem: 'assets/bermuda.jpg' },
    { nome: 'Meias Performance', preco: 30, categoria: 'meias', imagem: 'assets/meias.jpg' }
];

const listaProdutos = document.getElementById('listaProdutos');
const itensCarrinho = document.getElementById('itensCarrinho');
let carrinho = [];

function exibirProdutos(filtroCategoria = 'todos', filtroPreco = 'todos') {
    listaProdutos.innerHTML = '';
    produtos.forEach(prod => {
        if ((filtroCategoria === 'todos' || prod.categoria === filtroCategoria) &&
            (filtroPreco === 'todos' ||
             (filtroPreco === 'baixo' && prod.preco <= 100) ||
             (filtroPreco === 'alto' && prod.preco > 100))) {
            const div = document.createElement('div');
            div.className = 'produto';
            div.innerHTML = `<img src='${prod.imagem}' alt='${prod.nome}'><h3>${prod.nome}</h3><p>R$${prod.preco}</p>
                             <button onclick="adicionarCarrinho('${prod.nome}')">Comprar</button>`;
            listaProdutos.appendChild(div);
        }
    });
}

function adicionarCarrinho(nome) {
    carrinho.push(nome);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    itensCarrinho.innerHTML = carrinho.join(', ');
}

document.getElementById('categoriaFiltro').addEventListener('change', e => {
    exibirProdutos(e.target.value, document.getElementById('precoFiltro').value);
});

document.getElementById('precoFiltro').addEventListener('change', e => {
    exibirProdutos(document.getElementById('categoriaFiltro').value, e.target.value);
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert('Pagamento via Pix gerado! Copie a chave: pix@mota-fitness.com');
});

// Login com LocalStorage
const loginForm = document.getElementById('loginForm');
const cadastroBtn = document.getElementById('cadastroBtn');

cadastroBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    localStorage.setItem('usuario', JSON.stringify({ email, senha }));
    alert('Cadastro realizado com sucesso!');
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.email === email && usuario.senha === senha) {
        alert('Bem-vindo, ' + email);
    } else {
        alert('Usuário não encontrado.');
    }
});

exibirProdutos();
