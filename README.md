# Orange movies

Projeto ainda está em desenvolvimento. Readme Atualizado conforme o avanço do mesmo.

## Sobre o projeto
Orange movies é um site com filmes e séries onde você poderá saber mais informações (através de uma api) do mesmo como, diretor, ano de lançamento, os mais populares do momento e muito mais. Você poderá salvar os seus filmes e séries favoritos em sua lista. 

### Ferramentas utilizadas
<ul>
  <li>trello</li>
  <li>Figma</li>
  <li>React Js</li>
  <li>Firebase</li>
</ul>

## trello

Para uma melhor organização do projeto, estou fazendo uso da ferramenta trello (Sendo atualizado conforme a necessidade do projeto).

![image](https://user-images.githubusercontent.com/70671093/161816464-75bf2ddf-967e-4096-9d25-c6585a5fd3b2.png)



## Figma
Design do site, logo e paleta de cores desenvolvidos por mim através do editor gráfico Figma.

![orange-movies](https://user-images.githubusercontent.com/70671093/161812275-89f355ad-37c3-4280-bd1b-184e438c8b55.gif)

## O projeto

### Banner

![ezgif com-gif-maker](https://user-images.githubusercontent.com/70671093/162218787-9fcbff61-1fa6-4dcb-8204-19d592511412.gif)

Para criar o banner sendo atualizado toda vez que a página atualiza eu fiz uso dos hooks useState e useEffect. 
 Primeiro, criei duas váriaveis de estado; uma que irá conter a lista de filmes e a outra a qual irá conter o filme que será renderizado na página.
 ![image](https://user-images.githubusercontent.com/70671093/162218407-a15cb578-c6a0-4c08-b6e8-5d23d16e463c.png)
 
 com o useEffect, crio uma função a qual vou ter acesso a API que irei trabalhar neste projeto e para isso, faço uso do fetch que ao retornar uma resposta, armazeno na vavirável de estado setMovieList.
 ![image](https://user-images.githubusercontent.com/70671093/162220612-26463c37-bbd2-4de8-8151-8595d45b2ccb.png)

Em seguida, faço uso de mais um useEffect pois nele terá a função a qual vai escolher um filme aleatório da lista de filmes, pegar as informações necessárias e passar para a variável de estado setMovie e para este segundo useEffect funcionar, como dependência, utilizo a própria lista de filmes que será chamada
![image](https://user-images.githubusercontent.com/70671093/162221573-2b66dcb4-0f30-4f66-8598-db55b1eceeb3.png)

Tudo configurado, agora é hora de renderizar estas informações e para isso, através da variável de estado movie, tenho acesso as informações necessárias do filme em questão.

![image](https://user-images.githubusercontent.com/70671093/162222121-d82e27d3-b237-4c8c-b84c-3451ee944da7.png)

Feito isso, estilo a página chegando então no resultado mostrado no título.

### Carousel
![ezgif com-gif-maker](https://user-images.githubusercontent.com/70671093/162632070-e39ccef5-d124-4396-a396-ee9f53233d50.gif)


Para o carousel, uso a mesma ideia do banner, porém com algum ajustes. Também faço uma busca na API através do fetch e o adiciono em uma variável de estado. Porém desta vez, ao invés de mostrar somente um filme eu quero que mostre todos no carousel e para isso eu faço uso do método map(). Faço uma desestruturação para extrair somente as informações que quero da array e passo através do return.
![image](https://user-images.githubusercontent.com/70671093/162574565-6cbe6084-09c7-4e09-9d9d-88422d8d66a4.png)

Agora preciso criar os botões para passar o carousel e para funcionar eu fiz uso do hook useRef para ter como referência o elemento em questão, no caso, o carousel.
Então eu crio uma função através do clique do usuário. Então eu passo ao meu scrollLeft o que tiver no meu offsetWidth.

![image](https://user-images.githubusercontent.com/70671093/162574860-16dc1713-1e09-4562-93bb-d1e39d7cac43.png)

Para fazer os botões do carousel desaparecem quando não tiver mais conteúdo no scroll, primeiro, criei um contador utilizando o useRef com o valor de zero e passei para o useEffect mantendo o mesmo valor. Criei mais dois useRef, um para cada flecha.  O atributo ref(), passei para os botões e as flechas dentro deles.

![image](https://user-images.githubusercontent.com/70671093/162632323-3113c14e-acd1-45a5-a86d-2f547e522b8d.png)

A lógica usada aqui foi bem simples, através do evento de clique, cada vez que o usuário clicar na flecha para a direita o contador vai aumentar e o inverso para a flecha da esquerda e passei essa lógica para as funções de clique.

![image](https://user-images.githubusercontent.com/70671093/162632542-ff6c74ea-3665-44bf-9064-7276487e3b6d.png)
![image](https://user-images.githubusercontent.com/70671093/162632520-4d503780-8529-4668-a1bb-3289dc7c7ee9.png)
