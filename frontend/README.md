# Desafio Frontend - CRUD de Beneficiários e Planos

Este projeto foi desenvolvido como parte de um desafio técnico frontend, implementando um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de beneficiários e planos utilizando Angular.

## 📋 Descrição do Projeto

A aplicação consiste em um sistema para cadastro e gestão de beneficiários e seus respectivos planos.Com o foco nas funcionalidades do frontend, a arquitetura foi pensada buscando garantir modularidade e reutilização de componentes.

### 🏗️ Estrutura do Projeto

- **`shared/`**: Contém componentes reutilizáveis que podem ser utilizados em diferentes partes da aplicação
- **`pages/`**: Contém os componentes de alto nível que representam as páginas principais da aplicação
- **`services/`**: Os serviços que fazem conexão com o backend
- **`models/`**: Interfaces que modelam os dados permitindo a integração com o backend
- **`environments`/**: configurações de desenvolvimento e producao.

## 🚀 Como Executar o Projeto
Existem duas formas de rodar esse projeto, uma é executando com o docker e docker compose, a outra é utilizando localmente os recursos do angular cli ng ou npm

## 🚀 Executar o projeto com docker (recomendado)

Esta e a forma mais simples de rodar o projeto, pois o docker instalará todas as dependências (node 20 e json-server) automaticamente dentro de containers.

### Pré-requisitos
- docker
- docker compose

### Instalação e execução

1. **clonar o repositorio:**
```bash
git clone https://github.com/vagnersantosdasilva/4t-desafios.git
cd 4t-desafios/frontend
```

- Iniciar os containers: na raiz do projeto frontend, execute:

```Bash
docker-compose up
```

- O comando docker-compose up ja inicia o frontend com live reload e o backend mock simultaneamente.

- Acessar a aplicacao:

frontend: http://localhost:4200
backend mock (api): http://localhost:3000



## 🛠️ Executuar o projeto com ng (sem docker)

### Pré-requisitos
- Node.js (versão 20 )
- npm ou yarn
- json-server (instalado globalmente)
- Angular 20

### Instalação das Dependências

- Depois de ter feito a clonagem do projeto, acesse a raíz do projeto frontend e execute o comando

```bash
npm install
```

### Execução da Aplicação

1. **Na raiz do projeto Frontend, iniciar o JSON Server (Backend Mock):**
```bash
json-server --watch db.json --port 3000 --foreignKeySuffix _id
```

2. **Ainda na raiz do projeto , em outro terminal, iniciar a aplicação Angular:**
```bash
ng serve
```

3. **Acessar a aplicação:**
Abra seu navegador e navegue para `http://localhost:4200/`


### Servidor de Desenvolvimento
```bash
ng serve
```
A aplicação será recarregada automaticamente a cada alteração nos arquivos fonte.

### Build do Projeto
```bash
ng build
```
Compila o projeto e armazena os artefatos na pasta `dist/`. A build de produção é otimizada para performance.

### Executar Testes Unitários
```bash
ng test
```
Executa os testes unitários via [Karma](https://karma-runner.github.io).

### Scaffolding de Código
```bash
ng generate component nome-do-componente
```
Para ver a lista completa de schematics disponíveis:
```bash
ng generate --help
```

## 📦 Dependências Principais

- **Angular 20.0.0** - Framework principal
- **Bootstrap 5.3.8** - Framework CSS para estilização
- **Bootstrap Icons 1.13.1** - Biblioteca de ícones
- **RxJS 7.8.0** - Programação reativa

## 🎯 Funcionalidades

- ✅ Cadastro de beneficiários
- ✅ Cadastro de planos
- ✅ Operações CRUD completas
- ✅ Interface com Bootstrap
- ✅ Arquitetura modular e componentes reutilizáveis

## 🔗 URLs da Aplicação

- **Aplicação Frontend**: `http://localhost:4200/`
- **API JSON Server**: `http://localhost:3000/`


Para mais informações sobre Angular CLI, visite [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

