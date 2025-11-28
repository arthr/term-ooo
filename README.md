# Term.ooo Clone

Clone educativo do jogo Term.ooo (Termo / Dueto / Quarteto) construído com React, TypeScript, Tailwind CSS e shadcn/ui.

## Características

- **3 Modos de Jogo**:
  - **Termo**: 1 palavra, 6 tentativas
  - **Dueto**: 2 palavras simultâneas, 7 tentativas
  - **Quarteto**: 4 palavras simultâneas, 9 tentativas

- **Recursos**:
  - Palavra do dia baseada em data local
  - Persistência de estado no localStorage
  - Estatísticas por modo de jogo
  - Modo difícil (hard mode)
  - Modo de alto contraste
  - Compartilhamento de resultados
  - Interface responsiva
  - 100% client-side (sem backend)

## Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Tecnologias Utilizadas

- **Vite** - Build tool
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Componentes UI
- **React Router** - Roteamento
- **Lucide React** - Ícones

## Estrutura do Projeto

```
src/
├── components/       # Componentes React
│   ├── ui/          # Componentes shadcn/ui
│   ├── GameBoard.tsx
│   ├── Tile.tsx
│   ├── Keyboard.tsx
│   ├── Header.tsx
│   ├── TopTabs.tsx
│   ├── GameLayout.tsx
│   ├── HelpDialog.tsx
│   ├── StatsDialog.tsx
│   └── SettingsDialog.tsx
├── game/            # Lógica do jogo
│   ├── types.ts
│   ├── engine.ts
│   ├── storage.ts
│   ├── words-termo.ts
│   ├── words-dueto.ts
│   └── words-quarteto.ts
├── lib/             # Utilitários
│   └── utils.ts
├── App.tsx          # Componente principal
├── main.tsx         # Entry point
└── index.css        # Estilos globais
```

## Personalização

### Adicionar Mais Palavras

Para adicionar mais palavras ao jogo, edite os arquivos:
- `src/game/words-termo.ts`
- `src/game/words-dueto.ts`
- `src/game/words-quarteto.ts`

Adicione palavras às arrays `solutions` (palavras que podem ser respostas) e `allowed` (todas as palavras válidas como palpite).

### Mudar Data Inicial

Para alterar a data base para cálculo da palavra do dia, edite a constante `START_DATE` em `src/game/engine.ts`:

```typescript
const START_DATE = new Date('2022-01-01')
```

## Licença

Projeto educativo sem fins comerciais. Inspirado em Term.ooo e Wordle.

