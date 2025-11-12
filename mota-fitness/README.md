# MOTA MODA FITNESS — Next.js + Firebase

Versão com integração ao Firebase (Firestore + Storage + Auth) para painel admin real.

## Resumo
- Frontend Next.js + Tailwind
- Admin usa **Firebase Auth** (Email/Password) for login
- Produtos e imagens armazenados em **Firestore** e **Storage**

## Passo a passo - criar projeto Firebase
1. Acesse https://console.firebase.google.com e crie um novo projeto.
2. No projeto → Firestore Database → Criar base (modo de produção ou teste).
3. Storage → Criar bucket padrão.
4. Authentication → Métodos de login → Ative 'Email/Password'.
5. Authentication → Usuários → Crie o usuário ADMIN com email (ex: admin@motafitness.com) e senha desejada.

## Variáveis de ambiente (em Vercel ou .env.local para dev)
Crie um arquivo `.env.local` com:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

(Encontre esses valores no Firebase → Configurações do projeto → SDK da Web)

## Rodando localmente
1. `npm install`
2. `npm run dev`
3. Abra `http://localhost:3000`
4. Acesse o Admin em `http://localhost:3000/admin` — faça login com o usuário Firebase que você criou.

## Deploy na Vercel
1. Suba o repositório no GitHub
2. Em Vercel, crie novo projeto apontando para o repo
3. Em Settings → Environment Variables, adicione as variáveis `NEXT_PUBLIC_FIREBASE_*` conforme acima
4. Deploy

**Observação:** Este projeto usa o SDK do Firebase no frontend para CRUD. Para segurança e regras, configure as Regras do Firestore/Storage no console do Firebase para restringir acesso somente a usuários autenticados (recomendo liberar apenas para o admin ou funções específicas).
