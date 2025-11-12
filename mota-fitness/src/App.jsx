import React, { useState } from 'react';
import { ShoppingCart, Instagram, Phone, X } from 'lucide-react';

export default function MotaFitness() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, name: 'Legging Dourada', price: 29.99, img: 'https://i.imgur.com/6xpo0zJ.png', description: 'Legging preta com detalhes dourados, tecido de alta compressão.' },
    { id: 2, name: 'Mota Top', price: 13.99, img: 'https://i.imgur.com/1PZy1wK.png', description: 'Top esportivo confortável com faixa dourada.' },
    { id: 3, name: 'Short Dourado', price: 29.99, img: 'https://i.imgur.com/FlXpaLu.png', description: 'Short preto com laterais douradas, ideal para corrida.' },
    { id: 4, name: 'Conjunto Fit', price: 19.99, img: 'https://i.imgur.com/kpKJ3vL.png', description: 'Conjunto completo de top e legging, design exclusivo Mota Fitness.' }
  ];

  const addToCart = (product, size) => {
    if (!size) return alert('Escolha um tamanho antes de adicionar ao carrinho!');
    setCart([...cart, { ...product, size }]);
    setSelectedProduct(null);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="bg-white font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-black text-white">
        <div className="flex items-center gap-2">
          <img src="https://i.imgur.com/wF8oFk3.png" alt="Mota Fitness Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-[#D4AF37]">MOTA FITNESS</h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#home" className="hover:text-[#D4AF37]">INÍCIO</a>
          <a href="#catalogo" className="hover:text-[#D4AF37]">CATÁLOGO</a>
          <a href="#sobre" className="hover:text-[#D4AF37]">SOBRE</a>
          <a href="#contato" className="hover:text-[#D4AF37]">CONTATO</a>
        </nav>
        <button onClick={() => setShowCart(true)} className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-xs px-2 rounded-full">{cart.length}</span>}
        </button>
      </header>

      <section id="home" className="bg-black text-white px-8 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] leading-tight">CONQUISTE SEU<br />MELHOR DESEMPENHO</h2>
          <p className="mt-4 text-lg text-gray-300">Moda fitness premium para quem vive o treino.</p>
          <a href="#catalogo" className="inline-block mt-6 bg-[#D4AF37] text-black px-6 py-3 font-semibold rounded hover:opacity-90">VER COLEÇÃO</a>
        </div>
        <img src="https://i.imgur.com/k5wYeA1.png" alt="Modelo Mota Fitness" className="w-80 md:w-[400px] mt-10 md:mt-0" />
      </section>

      <section id="catalogo" className="px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-10">CATÁLOGO</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                  onClick={() => setSelectedProduct(p)}
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-lg">{p.name}</h4>
                <p className="text-[#D4AF37] text-xl font-bold mt-2">${p.price}</p>
                <button onClick={() => setSelectedProduct(p)} className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-black transition">COMPRAR AGORA</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button className="absolute top-2 right-2" onClick={() => setSelectedProduct(null)}><X /></button>
            <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-64 object-cover rounded" />
            <h4 className="text-xl font-semibold mt-4">{selectedProduct.name}</h4>
            <p className="text-gray-700 mt-2">{selectedProduct.description}</p>
            <p className="text-[#D4AF37] text-2xl font-bold mt-4">${selectedProduct.price}</p>
            <div className="mt-4 flex gap-2">
              {['P', 'M', 'G'].map(size => (
                <button key={size} onClick={() => addToCart(selectedProduct, size)} className="border border-gray-400 px-3 py-1 rounded hover:bg-[#D4AF37] hover:text-black transition">{size}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button className="absolute top-2 right-2" onClick={() => setShowCart(false)}><X /></button>
            <h4 className="text-xl font-semibold mb-4">Seu Carrinho</h4>
            {cart.length === 0 ? <p>Seu carrinho está vazio.</p> : (
              <ul className="space-y-2">
                {cart.map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                    </div>
                    <button onClick={() => removeFromCart(i)} className="text-red-500">Remover</button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && <button className="mt-4 bg-[#D4AF37] text-black px-6 py-2 rounded w-full font-semibold hover:opacity-90">Finalizar Compra</button>}
          </div>
        </div>
      )}

      <footer id="contato" className="bg-black text-white py-10 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /></a>
          <a href="https://wa.me/5599999999999" target="_blank" rel="noreferrer"><Phone /></a>
        </div>
        <p className="text-gray-400 text-sm">© 2025 Mota Fitness - Todos os direitos reservados.</p>
      </footer>

      <a href="https://wa.me/5599999999999" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 bg-[#D4AF37] text-black p-4 rounded-full shadow-lg hover:scale-110 transition">
        <Phone />
      </a>
    </div>
  );
}
