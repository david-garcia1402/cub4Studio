# Segurança infantil — porta que não se automatiza

Aplica a **todo** episódio, still, take, música e metadata. Se falhar um item, o Short não sobe.

## Proibido gerar ou publicar

- Bebê, criança, adolescente ou adulto humano (fotorreal ou cartoon)
- Personagens de terceiros: Duck_SR/Duck_Ai_Stuio, Peppa, Bluey, Cocomelon, Disney, Turma da Mônica, Pokémon, etc.
- Predadores caçando, animal ferido, resgate emocional manipulativo
- Sustinho, susto jump-scare, escuridão, tempestade violenta
- Violência, queda perigosa, afogamento, fogo, ferramenta afiada
- Comida nojenta, slime na cara, challenge, unboxing
- Título/thumb que promete lição (“aprenda as cores / números”) se o vídeo for só dança
- Hashtag stuffing (`#vairalvideo` ×10). Máximo 5 tags úteis
- Voz clonada de criança. Narração, se existir, é adulta e calorosa
- Música clássica infantil com dono (A Ram Sam Sam, reproduções de TV)
- 20 variações do mesmo take no mesmo dia

## Obrigatório

- Arco começo–meio–fim (hook, dança, payoff)
- Mesmo Pipoca e mesmo Nino do character sheet
- Made for Kids no YouTube
- Um humano assiste o clipe **inteiro** antes do upload
- Recibo/export da faixa Suno/Eleven guardado em `audio/license.txt`

## QA visual rápido (10 minutos)

1. Play em 1× no celular, em pé
2. Os 3 primeiros segundos já mostram Pipoca dançando?
3. Algum frame parece um rosto derretido ou olho torto? → recuse
4. A música está original e em PT-BR?
5. A criança de 4 anos entenderia o que aconteceu sem ler?

Assine o resultado com `python3 pipeline/qa_gate.py episodes/<pasta>`.
