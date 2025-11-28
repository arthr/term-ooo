# 🗺️ Roadmap de Features

Features bônus sugeridas para expansão do Term.ooo Clone.

---

## 🎯 Prioridade Alta

### 1. 🎮 Modo Treino/Prática
**Status:** 📋 Planejado

**Descrição:**
- Modo de jogo **ilimitado** sem vinculação ao dia
- Palavras aleatórias do dicionário
- Botão "Jogar de novo" após cada partida
- Estatísticas separadas (ou sem estatísticas)

**Benefícios:**
- Permite treinar sem esperar 24h
- Aumenta engajamento e tempo no app
- Ideal para novos jogadores praticarem

**Complexidade:** ⭐⭐ Média

**Arquivos a modificar:**
- `src/App.tsx` - Adicionar rota `/treino`
- `src/game/engine.ts` - Função para palavra aleatória
- `src/components/TopTabs.tsx` - Nova tab "Treino"

---

### 2. 🖼️ Compartilhamento Rico (Imagem)
**Status:** 📋 Planejado

**Descrição:**
- Gerar imagem PNG do resultado
- Tiles coloridos ao invés de emojis
- Formato otimizado para redes sociais
- Logo/marca d'água opcional

**Benefícios:**
- Mais bonito e viral nas redes sociais
- Diferencial competitivo
- Atrai novos jogadores organicamente

**Complexidade:** ⭐⭐⭐ Média-Alta

**Tecnologias sugeridas:**
- `html2canvas` ou `canvas API`
- Renderização de tiles em canvas

**Arquivos a criar:**
- `src/lib/shareImage.ts` - Lógica de geração
- Modificar `StatsDialog.tsx` - Novo botão

---

## 🎯 Prioridade Média

### 3. 📊 Estatísticas Avançadas
**Status:** 📋 Planejado

**Descrição:**
- Gráfico de linha com histórico de 30 dias
- Calendário heatmap (dias jogados)
- Tempo médio por partida
- Melhor streak com visualização
- Exportar dados em JSON

**Benefícios:**
- Jogadores adoram ver progresso detalhado
- Gamificação e senso de evolução
- Comparação com amigos

**Complexidade:** ⭐⭐⭐⭐ Alta

**Tecnologias sugeridas:**
- `recharts` ou `chart.js` para gráficos
- Modificar estrutura de `Stats` em `types.ts`

---

### 4. 🌈 Temas Customizáveis
**Status:** 📋 Planejado

**Descrição:**
- Múltiplos temas de cores
- Opções: Padrão / Escuro / Cyberpunk / Natureza / Oceano
- Customizar cores de correct/present/absent
- Salvar preferência em localStorage

**Benefícios:**
- Personalização aumenta apego ao app
- Acessibilidade (diferentes preferências visuais)
- Fácil e rápido de implementar

**Complexidade:** ⭐⭐ Média

**Arquivos a modificar:**
- `src/game/types.ts` - Adicionar `theme` em `Settings`
- `src/index.css` - CSS variables por tema
- `src/components/SettingsDialog.tsx` - Seletor de tema

---

### 5. 🎯 Modo 6 Letras
**Status:** 📋 Planejado

**Descrição:**
- Variante com palavras de 6 letras
- Dicionário específico para 6 letras
- Mais desafiador para veteranos

**Benefícios:**
- Aumenta longevidade do jogo
- Desafio extra para jogadores experientes

**Complexidade:** ⭐⭐⭐ Alta (precisa de novo dicionário)

**Arquivos necessários:**
- `src/game/words-seis.ts` - Novo dicionário
- Modificar `engine.ts` para suportar tamanho variável
- Ajustar UI dos tiles (6 ao invés de 5)

---

## 🎯 Prioridade Baixa

### 6. 🏅 Sistema de Conquistas
**Status:** 💭 Ideia

**Descrição:**
- Badges por feitos especiais:
  - "Primeira Vitória"
  - "10 Vitórias Seguidas"
  - "Venceu em 1 Tentativa"
  - "100 Jogos Completos"
  - "Mestre do Dueto"
- Coleção de troféus
- Progresso visual

**Complexidade:** ⭐⭐⭐⭐ Alta

---

### 7. 🌍 Múltiplos Idiomas
**Status:** 💭 Ideia

**Descrição:**
- Suporte para Inglês, Espanhol, etc.
- Dicionários por idioma
- Seletor de língua nas configurações

**Complexidade:** ⭐⭐⭐⭐⭐ Muito Alta

---

### 8. 👥 Modo Multiplayer/Competitivo
**Status:** 💭 Ideia

**Descrição:**
- Competir com amigos na mesma palavra
- Leaderboard global/local
- Ranking por tempo

**Complexidade:** ⭐⭐⭐⭐⭐ Muito Alta (precisa backend)

---

## 📊 Legenda de Status

- 📋 **Planejado**: Feature definida, pronta para implementação
- 💭 **Ideia**: Conceito inicial, precisa de refinamento
- 🚧 **Em Progresso**: Sendo desenvolvida
- ✅ **Concluído**: Implementada e testada

## 📝 Notas

Features estão ordenadas por **demanda da comunidade** e **facilidade de implementação**.

Contribuições são bem-vindas! Veja as issues para features específicas.

---

**Última atualização:** Novembro 2025

