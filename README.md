# cardsdeestudo
<h2 align="center">📊 Editor de Cards de Estudo</h2>


## Conteúdo

- [Conteúdo](#conteúdo)
- [Início](#início)
- [Stack](#stack)
- [Executando localmente](#executando-localmente)
  - [Cliente:](#cliente)
- [Como usar ](#como-usar)
  - [Inicio da Aplicação](#inicio-aplicacao)
  - [Criando uma nova apresentação](#nova-apresentacao)
  - [Navegando para uma nova apresentação](#navegando-nova-apresentacao)
  - [Voltando para uma apresentação anterior](#voltando-apresentacao-anterior)
  - [Criando um novo Card de estudo em uma apresentação específica](#criar-novo-card)
  - [Alterando informações de um Card de estudo em uma apresentação específica](#alterando-card)
  - [Iniciando apresentação](#iniciando-apresentacao)
- [Licença](#licença)

## Início

Clone o projeto localmente:

```bash
git clone https://github.com/alanbraulio/cardsdeestudo.git
```


## Stack

- Gerenciador de pacotes padrão: [npm](https://www.npmjs.com/)
- Front-end (Client): [Reactjs](https://pt-br.reactjs.org/)

## Executando localmente

### Cliente: 
- diretório raiz
  
    `npm install`

    `npm start`

## Como usar 

### Inicio da Aplicação
  - Ao iniciar a aplicação é exibida a primeira apresentação criada

### Criando uma nova apresentação
  - O usuário deve clicar no canto direito em Criar nova Apresentação.
  - Será exibida uma sidebar lateral para que o usuário escolha o modelo de Card que ele deseja (Retangular, Retrato ou Círculo)
  - Ao escolher o modelo o usuário deve clicar para cadastrar as informações de pergunta e resposta do modelo escolhido. Após digitar as informações o usuário deve clicar para cadastrar o card.
  - Na tela seguinte o usuário deve escolher entre criar mais um card ou finalizar a apresentação salvando. Obs: A qualquer momento o usuário pode cancelar o processo clicando em "Cancelar".
  - Se o usuário clicar em Criar novo Card ele será redirecionado para a primeira tela para escolher um novo modelo de Card.
  - Se o usuário clicar em Salvar Apresentação a sidebar será fechada e a nova apresentação será criada.
### Navegando para uma nova apresentação
  - O usuário tem no menu no canto direito o botão "Próxima Apresentação" para que ele consiga avançar e visualizar as demais apresentações. Vale lembrar que se houver apenas uma apresentação cadastrada este botão não estará habilitado.

### Voltando para uma apresentação anterior
  - O usuário tem no menu no canto direito o botão "Apresentação anterior" para que ele consiga voltar e visualizar as apresentações anteriores. Vale lembrar que se houver apenas uma apresentação cadastrada este botão não estará habilitado.

### Criando um novo Card de estudo em uma apresentação específica
  - O usuário tem no menu no canto direito os botões de "Próxima Apresentação" e "Apresentação anterior". Utilizando esses botões o usuário deve navegar até a apresentação que deseja incluir um novo card. Ao escolher a apresentação o usuário possui no canto direito um botão escrito "Criar Card para a apresentação atual". O usuário deve clicar nesse botão e então será aberta a sidebar para escolher o modelo e cadastrar a pergunta e resposta do novo Card. Ele poderá repetir o processo de criação de cards ilimitadas vezes até que por fim clique no botão "Salvar Apresentação" dentro da sidebar.

### Alterando informações de um Card de estudo em uma apresentação específica
  - Ao iniciar a aplicação os cards da primeira apresentação são apresentados. Ao clicar para avançar ou voltar os cards são exibidos de acordo com a respectiva apresentação. Nessa primeira tela o usuário dispõe de um botão de edição dentro do card que ao ser acionado exibe os 2 campos, um para editar a pergunta do Card e o outro para editar a resposta do Card. Alterando as informações e clicando em Salvar pergunta o Card é automaticamente atualizado. 
  
### Dando play na apresentação
  - O usuário deve escolher alguma apresentação específica utilizando os botões de navegação no canto direito e após escolher deve clicar em "Apresentar Cards". Clicando em Apresentar Cards os cards da apresentação escolhida serão mostrados na tela. Para visualizar a resposta do Card o usuário deve clicar em "Ver Resposta". Para finalizar a apresentação o usuário deve clicar em Fechar Apresentação.  
## Licença
 pasta raiz/licence.txt
