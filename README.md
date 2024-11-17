# Galeria-infinita-


# Galeria Infinita de Mondrian 🎨

Este é um projeto desenvolvido com Vue.js, que cria uma galeria infinita de imagens inspiradas nas obras de Piet Mondrian. À medida que o usuário rola a página, novas imagens são carregadas automaticamente, proporcionando uma experiência visual contínua.

# 🚀 Começando

 Siga os passos abaixo para rodar a galeria de imagens no seu ambiente local.

# 📋 Pré-requisitos

Antes de rodar o projeto, você precisará de:

* Node.js: Baixar e instalar Node.js

* npm (gerenciador de pacotes do Node.js) já vem com o Node.js.

🔧 Instalação

  1. Clone o repositório para a sua máquina local:

````
git clone https://github.com/usuario/nome-do-repositorio.git
````
  2. Entre na pasta do projeto:

````
cd nome-do-repositorio

````
  3. Instale as dependências:

````
npm install
````
  4.Execute o servidor de desenvolvimento:


````
npm run serve
````
 5.Acesse a galeria no navegador:
````

http://localhost:8080

````

# 🖼️ Funcionalidades

 * Galeria Infinita: Role para baixo e veja novas imagens carregando automaticamente, proporcionando uma experiência de rolagem contínua.

 * Imagens Inspiradas em Mondrian: O design das imagens é inspirado nas formas geométricas e no uso de cores primárias, características do famoso artista Piet Mondrian.
   
 * Carregamento Assíncrono: O carregamento das imagens é feito de forma assíncrona, o que garante uma navegação fluída sem travamentos.

# 📂 Estrutura do Projeto

 Aqui está uma visão geral da estrutura de diretórios do projeto:

````
/nome-do-repositorio
│
├── /public         # Arquivos estáticos
│
├── /src            # Código fonte
│   ├── /assets     # Imagens e outros assets
│   ├── /components # Componentes Vue.js
│   ├── /views      # Páginas/views
│   ├── App.vue     # Componente raiz do Vue
│   ├── main.js     # Ponto de entrada do Vue.js
│
├── package.json    # Dependências e scripts
└── README.md       # Este arquivo

````

# 📦 Dependências

 * Vue.js: Framework JavaScript para construir interfaces de usuário.

 * Axios: Biblioteca para fazer requisições HTTP (usada para carregar as imagens).

 * Vue Infinite Loading: Um componente Vue.js para implementar o carregamento infinito de imagens.

# 💡 Como Funciona

A galeria carrega as imagens à medida que o usuário rola para baixo. Utilizamos uma técnica de "scroll infinito", onde as imagens são carregadas de forma assíncrona quando o final da página é alcançado. Para isso, o componente InfiniteLoading foi utilizado para gerenciar o carregamento das imagens conforme o usuário interage com a página.

# 🌐 Carregamento das Imagens

O projeto puxa as imagens de uma API externa (ou um serviço de imagens, dependendo da implementação). As imagens são exibidas com a estilização característica de Mondrian, utilizando blocos de cores primárias e formas geométricas. O efeito visual é uma homenagem ao famoso movimento artístico De Stijl, de Mondrian.

# 🎨 Exemplo de Imagem
  Aqui está uma pequena amostra da galeria:


# 🤝 Contribuindo

 Se você gostaria de contribuir para o projeto, fique à vontade! Para isso, basta fazer um fork do repositório, realizar suas alterações e enviar um pull request. Agradecemos as contribuições!
