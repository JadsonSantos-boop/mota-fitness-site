import { useEffect, useState } from 'react'
import { auth, db, storage } from '../../lib/firebaseClient'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function Admin(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({id:'',title:'',price:0,stock:0,sizes:'',img:'',excerpt:'',category:''})
  const [file, setFile] = useState(null)

  useEffect(()=>{ check() },[])

  async function check(){
    // simple client-side check: try to fetch products from Firestore to see if configured
    try{ await fetch('/api/ping'); setLoading(false) }catch(e){ setLoading(false) }
  }

  async function login(e){
    e.preventDefault()
    const email = e.target.email.value
    const pw = e.target.password.value
    try{
      const cred = await signInWithEmailAndPassword(auth, email, pw)
      setUser(cred.user)
      loadProducts()
    }catch(err){ alert('Login Firebase falhou. Certifique-se de criar o usuário Admin no Firebase Auth.') }
  }

  async function loadProducts(){
    const col = collection(db, 'products')
    const snap = await getDocs(col)
    const items = snap.docs.map(d=>({ id:d.id, ...d.data() }))
    setProducts(items)
  }

  async function uploadAndSave(){
    if(file){
      const storageRef = ref(storage, 'products/'+file.name)
      const snap = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snap.ref)
      setForm({...form, img: url})
    }
    // use Firestore setDoc with id
    const id = form.id || form.title.toLowerCase().replace(/\s+/g,'-')
    await setDoc(doc(db, 'products', id), {...form, price: Number(form.price), stock: Number(form.stock), sizes: form.sizes ? form.sizes.split(',').map(s=>s.trim()) : []})
    alert('Produto salvo')
    setForm({id:'',title:'',price:0,stock:0,sizes:'',img:'',excerpt:'',category:''})
    loadProducts()
  }

  async function remove(id){
    if(!confirm('Excluir produto?')) return
    await deleteDoc(doc(db, 'products', id))
    loadProducts()
  }

  if(loading) return <div>Carregando...</div>

  if(!user) return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login Admin (Firebase)</h2>
      <form onSubmit={login}>
        <input name="email" type="email" placeholder="Email do admin" className="w-full p-2 border mb-3" required />
        <input name="password" type="password" placeholder="Senha" className="w-full p-2 border mb-3" required />
        <div className="flex gap-2"><button className="px-4 py-2 bg-black text-white rounded">Entrar</button></div>
      </form>
      <p className="text-sm mt-4 text-gray-500">Crie o usuário Admin no Firebase Auth (email + senha) e use aqui.</p>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 rounded-xl-2 bg-white card-shadow">
          <h3 className="font-semibold">Produtos</h3>
          <div className="text-2xl font-bold mt-2">{products.length}</div>
        </div>
        <div className="p-4 rounded-xl-2 bg-white card-shadow">
          <h3 className="font-semibold">Pedidos</h3>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
        <div className="p-4 rounded-xl-2 bg-white card-shadow">
          <h3 className="font-semibold">Clientes</h3>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Produtos</h2>
          <div className="space-y-4">
            {products.map(p=>(
              <div key={p.id} className="p-3 border rounded flex items-start justify-between">
                <div>
                  <div className="font-semibold">{p.title} <span className="text-sm text-gray-500">({p.id})</span></div>
                  <div className="text-sm">R$ {Number(p.price).toFixed(2).replace('.',',')} • Estoque: {p.stock}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>setForm({...p, sizes: p.sizes ? p.sizes.join(',') : ''})} className="px-3 py-1 border rounded">Editar</button>
                  <button onClick={()=>remove(p.id)} className="px-3 py-1 border rounded">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Criar / Editar produto</h2>
          <div className="p-4 border rounded bg-white">
            <label className="block text-sm">ID</label>
            <input value={form.id} onChange={e=>setForm({...form,id:e.target.value})} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Título</label>
            <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Preço (ex: 129.9)</label>
            <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Estoque</label>
            <input value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Tamanhos (vírgula separado, ex: P,M,G)</label>
            <input value={form.sizes} onChange={e=>setForm({...form,sizes:e.target.value})} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Imagem (upload)</label>
            <input type="file" onChange={e=>setFile(e.target.files[0])} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Categoria</label>
            <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full p-2 border mb-2" />
            <label className="block text-sm">Descrição</label>
            <textarea value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} className="w-full p-2 border mb-2" />
            <div className="flex gap-2">
              <button onClick={uploadAndSave} className="px-4 py-2 bg-black text-white rounded">Salvar</button>
              <button onClick={()=>setForm({id:'',title:'',price:0,stock:0,sizes:'',img:'',excerpt:'',category:''})} className="px-4 py-2 border rounded">Limpar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
