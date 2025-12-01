# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added
- Sistema de versionamento semântico
- Badge de versão no canto inferior da aplicação
- Documentação completa de versionamento em `.docs/VERSIONAMENTO_SEMANTICO.md`

---

## [0.3.0] - 2024-12-01

### Added
- Sistema de dialogs responsivos (Dialog desktop / Sheet mobile)
- Abertura automática de HelpDialog em modos não iniciados
- Abertura automática de StatsDialog em jogos concluídos
- Componente ResponsiveDialog para reuso
- Componente ResponsiveScrollArea para scroll contextual

### Fixed
- Distribuição de tentativas agora respeita mínimo por modo
- Medalhas (🥇🥈🥉) corretamente posicionadas por modo de jogo
- Performance de useEffect com dependências otimizadas
- Barras impossíveis removidas da visualização

### Changed
- Todos os dialogs migrados para sistema responsivo unificado
- DialogShell refatorado para aceitar props flexíveis

---

## [0.2.0] - 2024-11-30

### Added
- Chat WebSocket em tempo real
- Sistema de autenticação de chat
- Indicador de usuários online
- Notificações de novas mensagens
- Histórico de palavras (ArchiveDialog)
- Calendário para seleção de dias anteriores

### Fixed
- Animações de tiles conflitando com transforms
- Gradientes dinâmicos do teclado em modo Dueto
- Mapeamento de cores do teclado em modo Quarteto
- Listener de teclado respeitando estados desabilitados
- Fluxo de atualização de palpites usando forma funcional do estado
- StatsDialog exibindo valores padrão quando estatísticas não disponíveis
- Configuração do ESLint para reconhecer globais do browser

---

## [0.1.0] - 2024-11-15

### Added
- Implementação inicial do clone Term.ooo
- Três modos de jogo: Termo, Dueto, Quarteto
- Sistema de estatísticas completo
- Modo difícil
- Modo alto contraste
- Animações 3D de tiles (flip, shake, happy jump)
- Teclado virtual responsivo
- Persistência de estado no localStorage
- Design responsivo mobile-first
- 10.589 palavras extraídas da base original
- Dev Mode secreto (Konami Code: ↑↑↓↓←→←→BA)
- Bodão easter egg (referência ao Orochinho)
- Compartilhamento de resultados

---

## Tipos de Mudanças

- `Added` - Novas funcionalidades
- `Changed` - Mudanças em funcionalidades existentes
- `Deprecated` - Funcionalidades que serão removidas
- `Removed` - Funcionalidades removidas
- `Fixed` - Correções de bugs
- `Security` - Correções de segurança

---

[Unreleased]: https://github.com/arthr/term-ooo/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/arthr/term-ooo/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/arthr/term-ooo/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/arthr/term-ooo/releases/tag/v0.1.0
