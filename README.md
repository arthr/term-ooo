# Term.ooo Clone

Clone completo e funcional do jogo [Term.ooo](https://term.ooo), desenvolvido com React, TypeScript e Tailwind CSS.

🌐 **[Jogue agora no GitHub Pages!](https://arthr.github.io/term-ooo/)** 🎮

## 🎮 Sobre o Jogo

Adivinhe a palavra do dia em português! Três modos disponíveis:
- **Termo**: 1 palavra em 6 tentativas
- **Dueto**: 2 palavras em 7 tentativas
- **Quarteto**: 4 palavras em 9 tentativas

Cada palpite revela dicas sobre as letras:
- 🟩 **Verde**: Letra correta na posição correta
- 🟨 **Amarelo**: Letra correta na posição errada
- ⬛ **Cinza**: Letra não existe na palavra

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

- **Recursos adicionais:**
  - ⏱️ Countdown visual para próxima palavra
  - 🎨 Modo de alto contraste (acessibilidade)
  - 📤 Compartilhar resultados (grid de emojis)
  - 📱 Interface responsiva (mobile-first)
  - 💡 Solutions reveladas ao finalizar
  - 🔽 Toggle TopTabs (economiza espaço na tela)
  - ℹ️ AboutDialog com história épica e animações
  - 🐐 Botão Bodão com áudio (Béééééé!)

### 🎮 Dev Mode (Easter Egg)
Pressione o Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`

**Ferramentas disponíveis:**
- 👁️ Revelar soluções do dia
- 🏆 Vitória instantânea (auto-complete)
- 🔄 Recarregar página rapidamente
- 🗑️ Limpar localStorage (com confirmação dupla)

Dica: abra as Configurações para lembrar o código! 😉

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

### Ferramentas Dev
- **ESLint 9** - Linting (flat config)
- **TypeScript ESLint** - Rules para TS
- **PostCSS** - Processamento CSS

### Libs Auxiliares
- **react-countdown** - Countdown visual
- **clsx** - Utilitário de classes condicionais

## 📁 Arquitetura do Projeto

```
term-ooo/
├── public/                      # Assets estáticos
│   └── assets/
│       └── mp3/
│           └── bodao.mp3       # Áudio do Bodão
├── database/                    # Arquivos de referência
│   └── term.ooo.js             # Código original (para estudo)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── src/
│   ├── components/             # Componentes React
│   │   ├── ui/                # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── switch.tsx
│   │   │   └── tabs.tsx
│   │   ├── AboutDialog.tsx    # Dialog com história épica
│   │   ├── DevModeDialog.tsx  # Dialog de ferramentas dev
│   │   ├── GameBoard.tsx      # Board individual (grid 6x5)
│   │   ├── GameLayout.tsx     # Layout responsivo dos boards
│   │   ├── Header.tsx         # Cabeçalho com botões e áudio
│   │   ├── HelpDialog.tsx     # Dialog de instruções
│   │   ├── Keyboard.tsx       # Teclado virtual com gradientes
│   │   ├── SettingsDialog.tsx # Dialog de configurações
│   │   ├── StatsDialog.tsx    # Dialog de estatísticas
│   │   ├── Tile.tsx           # Tile individual (letra)
│   │   └── TopTabs.tsx        # Tabs com toggle animado
│   ├── game/                  # Lógica do jogo
│   │   ├── engine.ts          # Motor do jogo (avaliação, validação)
│   │   ├── storage.ts         # Interface com localStorage
│   │   ├── types.ts           # TypeScript interfaces e types
│   │   ├── words-termo.ts     # Dicionário Termo (1 palavra)
│   │   ├── words-dueto.ts     # Dicionário Dueto (2 palavras)
│   │   └── words-quarteto.ts  # Dicionário Quarteto (4 palavras)
│   ├── lib/                   # Utilitários gerais
│   │   └── utils.ts           # Funções auxiliares (cn, dates)
│   ├── App.tsx                # Componente principal (state manager)
│   ├── main.tsx               # Entry point da aplicação
│   ├── index.css              # Estilos globais + animações
│   └── vite-env.d.ts          # Types do Vite
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

## 🗺️ Features Futuras

Veja o [ROADMAP_FEATURES.md](ROADMAP_FEATURES.md) para lista completa de features planejadas.

**Próximas implementações:**
1. 🎮 Modo Treino (jogo ilimitado)
2. 🖼️ Compartilhamento como imagem
3. 📊 Estatísticas avançadas com gráficos

## 🤝 Contribuindo

Este é um projeto educativo. Sugestões e melhorias são bem-vindas!

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

**Béééééé! 🐐**

---

**Desenvolvido com 💚, muito ☕ e 5 latas de Red Bull**  
_Enquanto assistia o Orochinho mandando ver no Termo_

---

## 👤 Desenvolvedor

**Arthur Marques** (@arthr)

- 🐙 GitHub: [@arthr](https://github.com/arthr)
- 💼 LinkedIn: [@arthrmrs](https://linkedin.com/in/arthrmrs)
- 📸 Instagram: [@arthrmrs](https://instagram.com/arthrmrs)
- 🐦 X (Twitter): [@arthrmrs](https://x.com/arthrmrs)

