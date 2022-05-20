# Orange movies

Projeto ainda está em desenvolvimento mas você já consegue aproveitar algumas funcionalidades do site como:
<ul>
  <li>Ver informações detalhadas de um filme</li>
  <li>Conferir os trailers mais recentes</li>
  <li>Ver os filmes em cartaz</li>
  <li>Os atores e atrizes mais bem avaliados</li>
</ul>

Readme Atualizado conforme o avanço do mesmo.

## Deploy
Deploy realizado na vercel. Link do site ativo: https://orange-movies.vercel.app

## Sobre o projeto
Orange movies é um site com filmes e séries onde você poderá saber mais informações do mesmo como, diretor, ano de lançamento, os mais populares do momento e muito mais. Você poderá salvar os seus filmes e séries favoritos em sua lista através de um cadastro no site. 

### Ferramentas utilizadas
<ul>
  <li>trello</li>
  <li>Figma</li>
  <li>React Js</li>
  <li>Firebase</li>
</ul>

## trello

Para uma melhor organização do projeto, estou fazendo uso da ferramenta trello.

![image](https://user-images.githubusercontent.com/70671093/169414198-0e2d7426-51bd-4890-95cf-1e7380bbaf31.png)



## Figma
Design do site, logo e paleta de cores desenvolvidos por mim através do editor gráfico Figma.

![orange-movies](https://user-images.githubusercontent.com/70671093/161812275-89f355ad-37c3-4280-bd1b-184e438c8b55.gif)

## API
Neste projeto utilizei a API do site TMDB: https://developers.themoviedb.org/3/getting-started

## O projeto

Abaixo mostro a forma como pensei para chegar em determinadas funções do site.

### Banner

![ezgif com-gif-maker](https://user-images.githubusercontent.com/70671093/163178931-c2d8d8ed-e368-4a1d-9c3c-ae266b4e618a.gif)


Para criar o banner sendo atualizado toda vez que a página atualiza eu fiz uso dos hooks useState e useEffect. 
 Primeiro, criei duas váriaveis de estado; uma que irá conter a lista de filmes e a outra a qual irá conter o filme que será renderizado na página.
 ![image](https://user-images.githubusercontent.com/70671093/162218407-a15cb578-c6a0-4c08-b6e8-5d23d16e463c.png)
 
 com o useEffect, crio uma função a qual vou ter acesso a API que irei trabalhar neste projeto e para isso, faço uso do fetch que ao retornar uma resposta, armazeno na vavirável de estado setMovieList.
 ![image](https://user-images.githubusercontent.com/70671093/162220612-26463c37-bbd2-4de8-8151-8595d45b2ccb.png)

Em seguida, faço uso de mais um useEffect pois nele terá a função a qual vai escolher um filme aleatório da lista de filmes, pegar as informações necessárias e passar para a variável de estado setMovie e para este segundo useEffect funcionar, como dependência, utilizo a própria lista de filmes que será chamada
![image](https://user-images.githubusercontent.com/70671093/162221573-2b66dcb4-0f30-4f66-8598-db55b1eceeb3.png)

Tudo configurado, agora é hora de renderizar estas informações e para isso, através da variável de estado movie, tenho acesso as informações necessárias do filme em questão.

![image](https://user-images.githubusercontent.com/70671093/162222121-d82e27d3-b237-4c8c-b84c-3451ee944da7.png)

Feito isso, estilizo a página chegando então no resultado mostrado no título.

### Carousel
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/70671093/163179324-a7311e46-62ea-4c38-8b37-cf4f520cb355.gif)





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

E para deixar a flecha escondida logo quando a página é renderizada, no useEffect fiz uma condição a qual, se o contador for menor ou igual a zero (Que é o valor que ele vai estar assim que a página renderizar), não mostrar a flecha.

![image](https://user-images.githubusercontent.com/70671093/162632706-36c4d418-3f79-4357-8c96-7428f847e4f9.png)

Já para alternar entre filmes e séries, optei por separar cada categoria em componentes, sendo CarouselPopular para os filmes e CarouselSeries para as séries. Dupliquei o Carousel que tinha feito e coloquei em ambos os componentes, porém buscando na api as categorias correspondentes. E chamei ambos os componentes na página principal através do operador ternário. Criei uma variável de estado booleana chamada "isMovie" que, sendo verdadeira renderizar CaruselPopular(filmes) e falso renderizar CarouselSeries.

![image](https://user-images.githubusercontent.com/70671093/162782496-f452101d-8748-4d1e-8a9d-ee600236fba6.png)

Agora para fazer trocar através da opção selecionada, criei uma função que através do clique mudava para verdadeiro ou falso o "isMovie" e para indicar qual estava selecionado, fiz uso do operador ternário de novo só que para adicionar ou remover uma class.

![image](https://user-images.githubusercontent.com/70671093/162783015-dac3ec27-49dc-4471-89f5-2719580ce536.png)

Para colocar a nota de avalização de cada filme, busquei a nota do filme da api e passei através do map para uma span. Como a nota veio como float, para mudar a cor de acordo com a nota de cada filme, criei duas variáveis, uma para armazenar a nota e a outra a className. A Lógica aqui foi, se a nota for menor ou igual a 5, a variável className receber a string "movie-less", caso fosse maior ou igual a 7, receber a string "movie-high".

![image](https://user-images.githubusercontent.com/70671093/162979159-a55c96ef-676b-4880-b6f7-e0088a4f63d6.png)

passei essa variável className como atributo da propriedade className. Depois, no CSS fiz as estilizações de cada classe.
![image](https://user-images.githubusercontent.com/70671093/162980113-c7b02602-b033-4812-ab76-13b1beb9c24d.png)

![image](https://user-images.githubusercontent.com/70671093/162979892-642951ca-8f76-4d38-9208-85330578f9e1.png)

### Trailers no site
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/70671093/163848867-3b9a9b53-f8ff-417f-b0f8-0430e3134659.gif)

Para adicionar trailers no site, criei outro componente com o nome de trailers e nele fiz uma busca na api; utilizando o useEffect, através do id do filme e pra isso, novamente fiz uso do fetch. O filme que será recebido através das props mais tarde, irei armazenar em um hook de estado chamado trailers. 
Então eu crio uma span que receberá o trailer do youtube e a imagem de thumbnail. Então crio outra variável de estado chamada click com o valor de false que, ao clicar em span, chama uma função que irá fazer o toogle desta variável entre true e false. Então faço uso do operador ternário para saber se este clique esta true ou false, sendo true, ele mostra o trailer, sendo false mostra a thumbnail (imagem que irei buscar através das props). Agora importo este component no component Newsletter e neste componente eu busco pelos os filmes em cartazes no cinema, faço um map destes filmes e passo o component Trailers para ser retornado e neste momento, passo as informações de cada filme em questão que será adicionado no componente Trailer.
