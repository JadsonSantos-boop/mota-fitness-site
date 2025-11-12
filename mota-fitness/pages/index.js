import { useEffect, useState } from 'react'
import { db } from '../lib/firebaseClient'
import { collection, getDocs } from 'firebase/firestore'

export default function Home(){
  const [products, setProducts] = useState([])

  useEffect(()=>{
    async function load(){
      try{
        // try to load from Firestore - requires env vars configured
        const col = collection(db, 'products')
        const snap = await getDocs(col)
        const items = snap.docs.map(d=>({ id:d.id, ...d.data() }))
        setProducts(items)
      }catch(e){
        // fallback to local API
        fetch('/api/products').then(r=>r.json()).then(setProducts)
      }
    }
    load()
  },[])

  return (
    <div>
      <header className="header-gradient text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo_official.jpg" alt="MOTA FITNESS" className="h-14 object-contain rounded-md" />
            <div>
              <div className="text-xl font-bold tracking-tight">MOTA <span className="text-gold">FITNESS</span></div>
              <div className="text-xs text-gray-300">Moda • Performance • Corrida</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#catalog" className="text-sm hover:underline">Produtos</a>
            <a href="#about" className="text-sm hover:underline">Sobre</a>
            <a href="/admin" className="text-sm hover:underline">Painel ADM</a>
            <a href="#" className="px-4 py-2 rounded-2xl btn-gold font-semibold">Compre Agora</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">A linha premium para treinos e corridas — criada para mulheres que buscam performance com estilo.</h1>
              <p className="mt-6 text-lg text-gray-300 max-w-xl">Peças com alta tecnologia, modelagem pensada para movimento e acabamentos premium. Conforto e confiança a cada quilômetro.</p>
              <div className="mt-8 flex gap-4">
                <a href="#catalog" className="px-6 py-3 rounded-2xl bg-white text-black font-semibold">Ver catálogo</a>
                <a href="#about" className="px-6 py-3 rounded-2xl border border-white text-white">Sobre a marca</a>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
                <img src="/images/logo_secondary.jpg" alt="logo" className="h-10 rounded" />
                <div>Entrega rápida • Troca fácil • Atendimento VIP</div>
              </div>
            </div>

            <div className="rounded-xl-2 overflow-hidden card-shadow">
              <img src="/images/logo_secondary.jpg" alt="Banner" className="w-full h-80 object-cover" />
            </div>
          </div>
        </section>

        <section id="catalog" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Catálogo</h2>
            <div className="text-sm text-muted">Peças selecionadas com frete rápido</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p=>(
              <article key={p.id} className="rounded-xl-2 bg-white p-4 card-shadow">
                <div className="overflow-hidden rounded-lg">
                  <img src={p.img} alt={p.title} className="w-full h-64 object-cover" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">R$ {Number(p.price).toFixed(2).replace('.',',')}</div>
                    <div className="text-sm text-gray-500">Estoque: {p.stock}</div>
                  </div>
                  <button className="px-4 py-2 rounded-2xl bg-black text-white">Adicionar</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold">Sobre a MOTA FITNESS</h2>
            <p className="mt-4 text-gray-700 max-w-3xl">A MOTA FITNESS nasceu para unir alta performance e design premium. Nossas peças são pensadas para mulheres que correm, treinam e buscam elegância funcional.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl-2 bg-white card-shadow">
                <h3 className="font-semibold">Tecnologia</h3>
                <p className="text-sm text-gray-600 mt-2">Tecido com secagem rápida e compressão inteligente.</p>
              </div>
              <div className="p-4 rounded-xl-2 bg-white card-shadow">
                <h3 className="font-semibold">Design</h3>
                <p className="text-sm text-gray-600 mt-2">Modelagens modernas com paleta preto, dourado e branco.</p>
              </div>
              <div className="p-4 rounded-xl-2 bg-white card-shadow">
                <h3 className="font-semibold">Sustentabilidade</h3>
                <p className="text-sm text-gray-600 mt-2">Uso consciente de materiais e embalagens reduzidas.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <img src="/images/logo_official.jpg" alt="MOTA" className="mx-auto h-12 object-contain" />
            <div className="mt-4 text-sm text-gray-600">© {new Date().getFullYear()} MOTA FITNESS • Todos os direitos reservados</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
