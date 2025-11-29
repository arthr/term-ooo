# Changelog

## Atualizações
- Ajustado listener de teclado para respeitar estados desabilitados sem permanecer ativo ao alternar diálogos.
- Atualizado o fluxo de atualização de palpites para usar a forma funcional do estado, evitando perda de entradas rápidas.
- StatsDialog agora exibe valores padrão enquanto estatísticas não estão disponíveis, evitando desaparecimento do diálogo.
- Corrigida configuração do ESLint para reconhecer globais do browser e de scripts Node, eliminando falsos positivos de `no-undef`.
- Incluídas dependências faltantes em hooks e anotada exceção para o utilitário de botão, garantindo lint limpo com `pnpm lint`.
