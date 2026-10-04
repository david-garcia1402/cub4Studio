# Captação de projetos — /orcamento/

Página estática publicada pelo build existente: Vite copia `public/orcamento/` para `dist/orcamento/`. A home e as páginas AI to Business não mudam. A URL de campanha será https://cub4studio.com/orcamento/ após publicação e verificação.

## Fluxo

Anúncio → formulário → envio confirmado pelo FormSubmit → confirmação na própria página → WhatsApp opcional. Nome, WhatsApp, Instagram ou Facebook do empreendimento, segmento, presença atual, projeto e objetivo são enviados ao mesmo e-mail utilizado pelo formulário institucional: cub4studio@gmail.com. UTMs são preservadas no pedido, sem repassar parâmetros arbitrários nem dados pessoais da URL.

Não existe banco D1, CRM ou painel nesta implementação. Os pedidos vão por e-mail via FormSubmit. O endereço receptor precisa estar ativado no serviço. Respostas de ativação e falhas não exibem confirmação nem disparam Lead. O serviço externo ainda precisa ser verificado com um envio real e recebimento no e-mail antes de usar a página em campanha.

## Publicação e validação pendentes

1. Publicar a branch aprovada no Worker `cub4studio`, pelo fluxo de build existente (`npm run build` e `npx wrangler deploy`). Não alterar domínio ou DNS.
2. Abrir /orcamento/ no domínio e conferir desktop e celular.
3. Enviar um pedido de teste identificado como teste e verificar o recebimento no e-mail. Concluir a ativação do FormSubmit, se solicitada.
4. Configurar o ID do Meta Pixel do serviço de criação de sites. Não reutilizar automaticamente o Pixel do infoproduto. Esta página ainda não carrega Pixel/CAPI; o hook `fbq` é apenas preparado para disparar Lead após sucesso se uma integração for adicionada.
5. No atendimento, registrar qualificação, proposta e venda; o formulário enviado não significa lead já qualificado.

Uma evolução para armazenamento próprio pode usar Cloudflare Workers + D1, com acesso autenticado para consultar os pedidos. Essa evolução depende de acesso à conta Cloudflare e não está incluída aqui.
