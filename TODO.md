# TODO - Versionamento Mobile (CookingBrain)

- [ ] Ajustar `src/assets/base.css` para prevenir corte/overflow horizontal e corrigir heights
- [ ] Corrigir `src/components/Navbar.vue` (z-index, altura/scroll, estado do menu mobile)
- [ ] Criar “shell layout” em `src/App.vue` para compensar navbar fixed (mobile/desktop)
- [ ] Tornar `src/views/HomeView.vue` responsivo (remover margens fixas grandes e evitar breakpoints que cortam)
- [ ] Tornar `src/components/LoginForm.vue` e `src/views/LoginView.vue` responsivos (remover padding-right fixo)
- [ ] Ajustar `src/views/DashboardView.vue` para container responsivo
- [ ] Ajustar `src/router/index.ts` adicionando rotas faltando (/about, /services, /contact) para evitar 404
- [ ] Rodar `npm run type-check` e `npm run build` e revisar `npm run dev` no modo responsivo
