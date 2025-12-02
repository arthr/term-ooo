# Term.ooo Clone

[![Version](https://img.shields.io/badge/version-0.4.1-blue.svg)](https://github.com/arthr/term-ooo/releases/tag/v0.4.1)
[![License](https://img.shields.io/badge/license-Educational-green.svg)](LICENSE)
[![Deploy](https://github.com/arthr/term-ooo/actions/workflows/deploy.yml/badge.svg)](https://github.com/arthr/term-ooo/actions)

Clone completo e funcional do jogo [Term.ooo](https://term.ooo), desenvolvido com React, TypeScript e Tailwind CSS.

🌐 **[Jogue agora no GitHub Pages!](https://arthr.github.io/term-ooo/)** 🎮

---

## 📋 Índice

- [Sobre o Jogo](#-sobre-o-jogo)
- [Features Implementadas](#-features-implementadas)
- [Sistema de Chat em Tempo Real](#-sistema-de-chat-em-tempo-real)
- [Sistema de Efeitos Sonoros](#-sistema-de-efeitos-sonoros)
- [Dialogs Responsivos](#-dialogs-responsivos)
- [Hooks Customizados](#-hooks-customizados)
- [Início Rápido](#-início-rápido)
- [Deploy Automático](#-deploy-automático-github-actions)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Versionamento](#-versionamento)
- [A História Por Trás Deste Clone](#-a-história-por-trás-deste-clone)

---

## 🎮 Sobre o Jogo

Adivinhe a palavra do dia em português! Três modos disponíveis:
- **Termo**: 1 palavra em 6 tentativas
- **Dueto**: 2 palavras em 7 tentativas
- **Quarteto**: 4 palavras em 9 tentativas

Cada palpite revela dicas sobre as letras:
- 🟩 **Verde**: Letra correta na posição correta
- 🟨 **Amarelo**: Letra correta na posição errada
- ⬛ **Cinza**: Letra não existe na palavra
- 🔳 **Branco**: Tile não utilizado

---

## ✨ Features Implementadas

### 🎯 Core do Jogo
- Palavra do dia determinística (mesma para todos no mesmo dia)
- 10.589 palavras extraídas do Term.ooo original
- Normalização automática de acentos (digite sem acentos!)
- Avaliação precisa em 2 passos (correct → present → absent)
- Sistema de validação com dicionário completo
- Hard Mode: use as dicas reveladas nas próximas tentativas
- Persistência de estado e estatísticas no localStorage
- 100% client-side (sem necessidade de backend)

### 🎨 Interface e UX
- **Navegação avançada com cursor:**
  - Setas ← → para navegar entre posições
  - Space para pular para próxima vazia
  - Click direto nos tiles para posicionar cursor
  - Edição não-linear (substitui ao invés de inserir)

- **Animações 3D extraídas do código original:**
  - 🔄 Flip rotateY ao revelar tiles (450ms)
  - ✨ Pop translateZ ao digitar letra (150ms)
  - 🎊 Happy jump ao acertar palavra (600ms)
  - 📳 Shake em tentativas inválidas (500ms)

- **Teclado visual inteligente:**
  - Cores por estado de letra em cada board
  - Gradiente linear 50/50 no Dueto
  - Gradiente conic (pizza) no Quarteto
  - Estados: correct/present/absent/unused

- **Estatísticas detalhadas:**
  - Medalhas de ouro, prata, bronze e caveira (🥇🥈🥉💀)
  - Distribuição de tentativas
  - Porcentagem de vitórias
  - Streak atual e melhor
  - Separadas por modo de jogo

### 📱 Recursos Adicionais
- 💬 **Chat em tempo real** com WebSocket
- 🎵 **Efeitos sonoros e memes** durante o jogo
- 📱 **Interface 100% responsiva** (Dialog desktop / Sheet mobile)
- 📅 **Arquivo de Dias Anteriores** (últimos 30 dias)
- ⏱️ Countdown visual para próxima palavra
- 🎨 Modo de alto contraste (acessibilidade)
- 📤 Compartilhar resultados (grid de emojis)
- 💡 Solutions reveladas ao finalizar
- 🔽 Toggle TopTabs (economiza espaço na tela)
- ℹ️ AboutDialog com história épica e animações
- 🐐 Botão Bodão com áudio (Béééééé!)
- ⭐ Fundo animado com estrelas
- 🏷️ Versionamento semântico visível na UI
- 🔔 Notificações de novas mensagens

### 🎮 Dev Mode (Easter Egg)
Pressione o Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`

**Ferramentas disponíveis:**
- 👁️ Revelar soluções do dia
- 🏆 Vitória instantânea (auto-complete)
- 🔄 Recarregar página rapidamente
- 🗑️ Limpar localStorage (com confirmação dupla)

Dica: abra as Configurações para lembrar o código! 😉

---

## 💬 Sistema de Chat em Tempo Real

Chat multiplayer integrado ao jogo usando WebSocket!

### Features do Chat
- 🔌 **WebSocket em tempo real** - Mensagens instantâneas
- 👤 **Sistema de autenticação** - Escolha seu nickname
- 👥 **Indicador de usuários online** - Veja quem está jogando
- 🔔 **Notificações de novas mensagens** - Badge com contador
- ✨ **Animações de partículas** - IconButton do shadcn.io
- 💾 **Persistência de nickname** - Salvo no localStorage
- 📱 **100% responsivo** - Painel flutuante adaptativo

### Componentes do Chat
- `ChatButton` - Botão flutuante com animações e badge
- `ChatPanel` - Painel principal responsivo
- `ChatMessageList` - Lista de mensagens com scroll automático
- `ChatMessageItem` - Item individual de mensagem
- `ChatMessageInput` - Input de mensagem customizado
- `ChatNicknameForm` - Formulário de escolha de nickname

### Hooks Relacionados
- `useChatWebSocket` - Hook principal do WebSocket
- `useChatAuth` - Gerenciamento de autenticação
- `useChatConnection` - Status e reconexão automática
- `useChatMessages` - Mensagens e contador de não lidas

**Configuração:** `src/lib/chat-config.ts`

---

## 🎵 Sistema de Efeitos Sonoros

Sistema de áudio com memes que tocam em momentos específicos do jogo!

### Eventos de Som Implementados

| Evento | Momento | Arquivo | Status |
|--------|---------|---------|--------|
| `waiting` | Após 15s de inatividade no primeiro chute | `os_cara_no_teto.mp3` | ✅ |
| `lastAttempt` | Última tentativa do modo Quarteto | `eu_e_vc_gostoso.mp3` | ✅ |
| `share` | Ao compartilhar resultado | - | 🔜 |
| `gameOver` | Ao perder o jogo | - | 🔜 |
| `firstTryWin` | Vitória na primeira tentativa | - | 🔜 |
| `win` | Vitória (geral) | - | 🔜 |
| `wrongWord` | Palavra inválida | - | 🔜 |

### Features de Áudio
- 🎵 **Hook `useSoundEffects`** - Sistema principal
- 📦 **Cache de HTMLAudioElement** - Performance otimizada
- ⚡ **Preload inteligente** - Sons críticos carregados na inicialização
- 🎚️ **Controle de volume** - Volume configurável por evento
- ⏱️ **Timer de inatividade** - Som após 15s sem jogar
- 🔇 **Toggle global** - Ativar/desativar no SettingsDialog
- 💾 **Persistência** - Preferência salva no localStorage

**Arquitetura:**
```
src/lib/sounds/
├── types.ts           # Tipos TypeScript
├── config.ts          # Mapeamento eventos → arquivos
└── useSoundEffects.ts # Hook principal
```

---

## 📱 Dialogs Responsivos

Sistema unificado de dialogs que se adaptam ao dispositivo!

### Como Funciona
- 🖥️ **Desktop**: Dialog modal centralizado
- 📱 **Mobile**: Sheet (drawer) da direita, 100% altura
- 🔄 **Automático**: Detecta breakpoint `md` (768px)
- 🎨 **Props separadas**: `desktopClassName` e `mobileClassName`
- 📜 **Scroll inteligente**: `ResponsiveScrollArea` contextual

### Componentes Responsivos
- `ResponsiveDialog` - Container principal
- `ResponsiveDialogContent` - Conteúdo adaptativo
- `ResponsiveDialogHeader` - Cabeçalho responsivo
- `ResponsiveDialogTitle` - Título responsivo
- `ResponsiveDialogDescription` - Descrição responsiva
- `ResponsiveScrollArea` - Área de scroll contextual
- `DialogShell` - Base reutilizável para todos os dialogs

### Dialogs Implementados
Todos os 6 dialogs do jogo usam o sistema responsivo:
- `HelpDialog` - Como jogar
- `StatsDialog` - Estatísticas
- `SettingsDialog` - Configurações
- `AboutDialog` - História do projeto
- `DevModeDialog` - Ferramentas de desenvolvedor
- `ArchiveDialog` - Dias anteriores

### Features
- ✅ Abertura automática do `HelpDialog` em modos não iniciados
- ✅ Abertura automática do `StatsDialog` em jogos concluídos
- ✅ Gerenciamento centralizado com `useDialogManager`
- ✅ Animações com Framer Motion
- ✅ Fechamento com tecla ESC
- ✅ Lock de scroll quando aberto

---

## 🎣 Hooks Customizados

15 hooks customizados para arquitetura clean e reutilizável!

### Hooks de Chat (4)
| Hook | Responsabilidade |
|------|------------------|
| `useChatWebSocket` | WebSocket principal e orquestração |
| `useChatAuth` | Autenticação e gestão de nickname |
| `useChatConnection` | Gerenciamento de conexão e reconexão |
| `useChatMessages` | Mensagens e contador de não lidas |

### Hooks de UI (7)
| Hook | Responsabilidade |
|------|------------------|
| `useDialogManager` | Gerenciamento centralizado de dialogs |
| `useDialogAnimations` | Animações de dialogs (Framer Motion) |
| `useBodyScrollLock` | Lock de scroll quando modal aberto |
| `useEscapeKey` | Fechar dialogs com tecla ESC |
| `useMediaQuery` | Detecção de breakpoints (mobile/desktop) |
| `useTemporaryState` | Estados temporários (ex: "Copiado!") |
| `useSoundEffects` | Sistema de efeitos sonoros |

### Hooks de Jogo (4)
| Hook | Responsabilidade |
|------|------------------|
| `useGameMode` | Gerenciamento de modo de jogo (Termo/Dueto/Quarteto) |
| `useGameAnimations` | Todas as animações do jogo (flip, shake, happy) |
| `useKeyboardInput` | Input de teclado físico e virtual |
| `usePersistentGameState` | Persistência de estado no localStorage |
| `useStatsTracker` | Rastreamento e atualização de estatísticas |

**Localização:** `src/hooks/`

---

## 🚀 Início Rápido

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento (porta 5175)
pnpm run dev

# Build para produção
pnpm run build

# Preview do build de produção
pnpm run preview

# Lint do código
pnpm run lint
```

---

## 🚀 Deploy Automático (GitHub Actions)

Este projeto usa **GitHub Actions** para deploy automático no **GitHub Pages** a cada push na branch `main`.

### 🔄 Como Funciona

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]  # Dispara a cada push no main
```

### 📋 Pipeline de Deploy

| Etapa | Ação | Tempo Aprox. |
|-------|------|--------------|
| 1️⃣ **Checkout** | Clone do repositório | ~5s |
| 2️⃣ **Setup Node** | Instala Node.js 20 | ~10s |
| 3️⃣ **Setup pnpm** | Instala pnpm 10 | ~5s |
| 4️⃣ **Install** | Instala dependências | ~30s |
| 5️⃣ **Build** | `pnpm build` (Vite) | ~20s |
| 6️⃣ **Deploy** | Upload para gh-pages | ~10s |

**⏱️ Tempo total:** ~1-2 minutos

### 🔗 URLs

- **Production:** https://arthr.github.io/term-ooo/
- **Actions Dashboard:** https://github.com/arthr/term-ooo/actions
- **Workflow File:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### ⚙️ Configuração do Vite

O `vite.config.ts` detecta automaticamente o ambiente:

```typescript
base: command === 'build' ? '/term-ooo/' : '/'
```

- **Desenvolvimento local:** `base: '/'` (porta 5175)
- **GitHub Pages:** `base: '/term-ooo/'` (subpath no domínio)

---

## 🛠️ Stack Tecnológico

### Core
- **Vite 5** - Build tool ultrarrápido
- **React 18** - UI framework
- **TypeScript 5** - Type safety e IntelliSense
- **React Router 6** - Navegação SPA

### UI/Styling
- **Tailwind CSS 3** - Utility-first CSS
- **shadcn/ui** - Componentes acessíveis (Radix UI)
- **Framer Motion** - Animações fluidas e interativas
- **Lucide React** - Ícones SVG modernos
- **class-variance-authority** - Variantes de componentes
- **tailwind-merge** - Merge de classes CSS
- **Animate UI** - Componentes animados (StarsBackground)

### Real-time & Audio
- **Socket.IO Client** - WebSocket para chat em tempo real
- **HTMLAudioElement API** - Sistema de efeitos sonoros

### Ferramentas Dev
- **ESLint 9** - Linting (flat config)
- **TypeScript ESLint** - Rules para TS
- **PostCSS** - Processamento CSS

### Libs Auxiliares
- **react-countdown** - Countdown visual
- **react-day-picker** - Calendário do ArchiveDialog
- **clsx** - Utilitário de classes condicionais

---

## 📁 Arquitetura do Projeto

```
term-ooo/
├── public/                      # Assets estáticos
│   └── assets/
│       ├── mp3/
│       │   └── bodao.mp3       # Áudio do Bodão
│       └── sounds/             # 🆕 Efeitos sonoros e memes
│           ├── eu_e_vc_gostoso.mp3
│           └── os_cara_no_teto.mp3
├── database/                    # Arquivos de referência
│   └── term.ooo.js             # Código original (para estudo)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── src/
│   ├── components/             # Componentes React
│   │   ├── Chat/              # 🆕 Sistema de chat (6 componentes)
│   │   │   ├── ChatButton.tsx
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── ChatMessageList.tsx
│   │   │   ├── ChatMessageItem.tsx
│   │   │   ├── ChatMessageInput.tsx
│   │   │   └── ChatNicknameForm.tsx
│   │   ├── animate-ui/        # 🆕 Componentes animados
│   │   │   └── components/
│   │   │       └── backgrounds/
│   │   │           └── stars.tsx
│   │   ├── ui/                # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── sheet.tsx      # 🆕 Drawer mobile
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── responsive-dialog.tsx # 🆕 Dialog responsivo
│   │   │   ├── responsive-scroll-area.tsx
│   │   │   ├── message-input.tsx
│   │   │   ├── glowing-effect.tsx
│   │   │   └── shadcn-io/     # 🆕 IconButton com partículas
│   │   │       └── icon-button/
│   │   ├── AboutDialog.tsx
│   │   ├── ArchiveDialog.tsx
│   │   ├── DevModeDialog.tsx
│   │   ├── DialogShell.tsx    # 🆕 Base reutilizável de dialogs
│   │   ├── GameBoard.tsx
│   │   ├── GameLayout.tsx
│   │   ├── Header.tsx
│   │   ├── HelpDialog.tsx
│   │   ├── Keyboard.tsx
│   │   ├── SettingsDialog.tsx
│   │   ├── StatsDialog.tsx
│   │   ├── Tile.tsx
│   │   └── TopTabs.tsx
│   ├── hooks/                 # 🆕 15 hooks customizados
│   │   ├── useChatWebSocket.ts
│   │   ├── useChatAuth.ts
│   │   ├── useChatConnection.ts
│   │   ├── useChatMessages.ts
│   │   ├── useDialogManager.ts
│   │   ├── useDialogAnimations.ts
│   │   ├── useBodyScrollLock.ts
│   │   ├── useEscapeKey.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useTemporaryState.ts
│   │   ├── useGameMode.ts
│   │   ├── useGameAnimations.ts
│   │   ├── useKeyboardInput.ts
│   │   ├── usePersistentGameState.ts
│   │   └── useStatsTracker.ts
│   ├── game/                  # Lógica do jogo
│   │   ├── engine.ts          # Motor do jogo (avaliação, validação)
│   │   ├── storage.ts         # Interface com localStorage
│   │   ├── types.ts           # TypeScript interfaces e types
│   │   ├── chat-types.ts      # 🆕 Tipos do chat
│   │   ├── words-termo.ts     # Dicionário Termo (1 palavra)
│   │   ├── words-dueto.ts     # Dicionário Dueto (2 palavras)
│   │   └── words-quarteto.ts  # Dicionário Quarteto (4 palavras)
│   ├── lib/                   # Utilitários gerais
│   │   ├── sounds/            # 🆕 Sistema de áudio
│   │   │   ├── types.ts       # Tipos de eventos de som
│   │   │   ├── config.ts      # Mapeamento eventos → arquivos
│   │   │   └── useSoundEffects.ts # Hook principal
│   │   ├── chat-config.ts     # 🆕 Configuração do chat
│   │   ├── chat-utils.ts      # 🆕 Utilitários do chat
│   │   ├── dates.ts           # Módulo central de datas
│   │   ├── utils.ts           # Funções auxiliares (cn, normalize)
│   │   ├── version.ts         # 🆕 Controle de versão
│   │   └── z-index.ts         # 🆕 Gerenciamento de z-index
│   ├── App.tsx                # Componente principal (state manager)
│   ├── main.tsx               # Entry point da aplicação
│   ├── index.css              # Estilos globais + animações
│   └── vite-env.d.ts          # Types do Vite
├── CHANGELOG.md               # 🆕 Histórico de mudanças
├── eslint.config.js           # ESLint 9 (flat config)
├── tailwind.config.cjs        # Configuração Tailwind
├── postcss.config.cjs         # Configuração PostCSS
├── tsconfig.json              # Configuração TypeScript (app)
├── tsconfig.node.json         # Configuração TypeScript (build)
├── vite.config.ts             # Configuração Vite (base path condicional)
├── components.json            # Configuração shadcn/ui
├── pnpm-workspace.yaml        # Workspace do pnpm
├── package.json               # Dependências e scripts
├── PROMPT.md                  # Especificação original do projeto
├── ROADMAP_FEATURES.md        # Features futuras planejadas
└── README.md                  # Este arquivo
```

---

## 🎯 Mecânicas Implementadas

### Avaliação de Palavras (2-Pass Algorithm)
```typescript
// Pass 1: Marca corretas (verdes)
// Pass 2: Marca presentes (amarelas) considerando frequência
// Restantes: Marca ausentes (cinzas)
```

### Palavra do Dia
- Algoritmo determinístico baseado em dias desde 01/01/2022
- Índice da palavra = `dayNumber % totalWords`
- Garante mesma palavra para todos os jogadores

### Hard Mode
- Letra correta (verde) deve ser usada na mesma posição
- Letra presente (amarela) deve ser usada em alguma posição
- Validação antes de aceitar próximo palpite

### Cursor Inteligente
- Edição não-linear: substitui letra ao invés de inserir
- Navegação livre entre posições
- Space pula para próxima vazia
- Cursor visual com borda inferior

---

## 🎨 Sistema de Animações

### Animações de Tiles (CSS extraídas do original)

| Animação | Trigger | Duração | Efeito |
|----------|---------|---------|--------|
| **Shake** | Palavra inválida | 500ms | translateX horizontal |
| **Flip** | Revelar tiles | 450ms | rotateY 3D (0° → 90° → -90° → 0°) |
| **Ontype** | Digitar letra | 150ms | translateZ 3D (pop frontal) |
| **Happy Jump** | Acertar palavra | 600ms | translateY (pulo com curva suave) |

### Animações de UI (Framer Motion)

| Elemento | Animação | Efeito |
|----------|----------|--------|
| **Dialogs** | Stagger children | Elementos aparecem sequencialmente |
| **TopTabs** | Height + Opacity | Desliza para baixo/cima suavemente |
| **ChevronDown** | Rotate 180° | Gira ao abrir/fechar TopTabs |
| **Redes Sociais** | Scale + Rotate | Hover com bounce e rotação |
| **Ícones** | Spring physics | Entrada com física realista |
| **Chat Button** | Particles + Glow | Partículas e brilho em novas mensagens |

---

## 📦 Versionamento

Este projeto segue o [Semantic Versioning](https://semver.org/lang/pt-BR/) (SemVer):

**Formato:** `MAJOR.MINOR.PATCH` (ex: `0.4.1`)

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Novas funcionalidades (compatíveis)
- **PATCH**: Correções de bugs

### Versão Atual: **v0.4.1**

**Histórico de Releases:**
- **v0.4.1** (2024-12-02) - Som de inatividade + Fix settings
- **v0.4.0** (2024-12-02) - Sistema de efeitos sonoros
- **v0.3.0** (2024-12-01) - Dialogs responsivos + Versionamento
- **v0.2.0** (2024-11-30) - Chat WebSocket + Arquivo
- **v0.1.0** (2024-11-15) - Implementação inicial

**Documentação completa:** [CHANGELOG.md](CHANGELOG.md)

**Badge de versão:** Visível no canto inferior da aplicação

---

## 🗺️ Features Futuras

Veja o [ROADMAP_FEATURES.md](ROADMAP_FEATURES.md) para lista completa de features planejadas.

**Próximas implementações:**
1. 🎮 Modo Treino (jogo ilimitado)
2. 🖼️ Compartilhamento como imagem
3. 📊 Estatísticas avançadas com gráficos

---

## 🤝 Contribuindo

Este é um projeto educativo. Sugestões e melhorias são bem-vindas!

---

## 📜 Créditos e Referências

### Jogo Original
- **Term.ooo**: [https://term.ooo](https://term.ooo)
- **Criador**: [Fernando Serboncini](https://www.linkedin.com/in/ferserboncini/)

### Inspiração
- **Wordle**: [https://www.nytimes.com/games/wordle/](https://www.nytimes.com/games/wordle/)
- **Criador**: Josh Wardle

### Agradecimentos
Este clone foi desenvolvido exclusivamente para **fins educacionais** e de aprendizado, sem objetivos comerciais.

As palavras, mecânicas e animações foram estudadas e replicadas do jogo original com respeito e admiração pelo trabalho do Fernando Serboncini.

---

## 📄 Licença

Projeto educativo sem fins comerciais.

---

## 💡 A História Por Trás Deste Clone

### 🌙 A Madrugada Épica

_Tudo começou durante uma noite de trabalho em um projeto corporativo. Enquanto o código compilava, uma live do **Pedro Orochi (Orochinho)** tocava ao fundo. E lá estava ele, o lendário "**bodão**" (béééééé 🐐), mandando muito bem no Term.ooo como sempre._

_Foi nesse momento, entre um commit e outro, que surgiu a curiosidade: "Como será que funciona por baixo dos panos?" A pergunta simples virou obsessão. O projeto do trabalho? Esquecido. A live do Orochinho? Em loop. As latinhas de Red Bull? Já na quinta._

### ☕ 5 Red Bulls Depois...

_O que deveria ser apenas "dar uma olhada rápida" no código, virou uma jornada épica de:_
- 🔬 Engenharia reversa em JavaScript ofuscado
- 🔓 Extração de 10.589 palavras escondidas em Base64
- 🎨 Análise de animações CSS em componentes shadow DOM
- 🎯 Reimplementação completa em React + TypeScript
- 🎮 E ainda um Dev Mode secreto com Konami Code (porque sim!)

_Quando o sol nasceu, lá estava: um clone funcional com **98% de fidelidade ao original**, todas as animações 3D extraídas pixel-perfect, e até features bônus que o original não tem._

### 🚀 E Não Parou Por Aí...

Após o lançamento inicial, o projeto continuou evoluindo:
- 💬 **Chat em tempo real** para jogar com amigos
- 🎵 **Sistema de memes sonoros** para momentos épicos
- 📱 **Interface 100% responsiva** para mobile
- 🏷️ **Versionamento profissional** com SemVer

### 🐐 Agradecimentos Especiais

Um salve pro **Pedro Orochi (Orochinho)**, o bodão mor do Termo, que sem saber foi a centelha de inspiração para este projeto. Se você também é um fã que assiste lives/vídeos do Orochinho enquanto coda, você entende. 🎮✨

E é claro, aos desenvolvedores originais do Term.ooo pela criação desse jogo viciante!

### 📖 Moral da História

_Red Bull realmente te dá asas... asas para:_
- ☕ Virar a noite codando
- 🔬 Fazer engenharia reversa em código ofuscado
- 🎨 Replicar animações 3D complexas
- 🐐 Homenagear o bodão do Termo (Orochinho)
- 🚀 E criar um clone completo enquanto assiste live
- 💬 Adicionar chat multiplayer porque dá pra jogar com os amigos
- 🎵 Colocar memes sonoros porque diversão é importante

**Béééééé! 🐐**

---

**Desenvolvido com 💚, muito ☕ e 5 latas de Red Bull**  
_Enquanto assistia o Orochinho mandando ver no Termo_

---

## 👤 Desenvolvedor

**Arthur Morais** (@arthr)

- 🐙 GitHub: [@arthr](https://github.com/arthr)
- 💼 LinkedIn: [@arthrmrs](https://linkedin.com/in/arthrmrs)
- 📸 Instagram: [@arthrmrs](https://instagram.com/arthrmrs)
- 🐦 X (Twitter): [@arthrmrs](https://x.com/arthrmrs)
