# 🎬 Golden Raspberry Awards Web

Este projeto é a aplicação **frontend Angular** para visualização e interação com a [API Golden Raspberry Awards](https://github.com/EduardoDrozda/golden-raspberry-awards), permitindo aos usuários explorar informações sobre produtores premiados com o **Golden Raspberry Award**.

---

## 📑 Tabela de Conteúdos

- [🚀 Objetivo](#-objetivo)
- [🏗️ Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
  - [📁 Estrutura de Diretórios](#-estrutura-de-diretórios)
  - [⚙️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📦 Instalação e Execução](#-instalação-e-execução)
- [🧪 Testes](#-testes)
- [🧪 Testes com Cobertura](#-testes-com-cobertura)

---

## 🚀 Objetivo

Fornecer uma interface amigável, responsiva e acessível para que usuários possam visualizar os produtores de filmes que:

- Dashboard com **vários indicativos a respeito do evento**.
- Lista de filmes que foram indicados por ano **com filtros por ano e se ganhou**.

---

## 🏗️ Arquitetura e Tecnologias

A aplicação utiliza **Angular 19** com **SCSS modularizado**, seguindo princípios de **componentização** e organização por domínio funcional.

### 📁 Estrutura de Diretórios

```bash
src/
├── app/
│   ├── core/                    # Serviços e funcionalidades de núcleo da aplicação
│   ├── features/                # Módulos funcionais
│   │   ├── dashboard/           # Página principal com estatísticas
│   │   └── movies/              # Exibição de filmes e premiações
│   ├── shared/                 # Componentes e pipes reutilizáveis
│   │   ├── components/
│   │   └── pipes/
│   └── styles/                 # Estilos globais e variáveis SCSS
│       ├── _variables.scss
│       ├── _button.scss
│       ├── _card.scss
│       └── ...
├── environments/              # Configurações de ambiente
├── app.component.ts           # Componente raiz
├── app.routes.ts              # Rotas da aplicação
└── ...

### ⚙️ Tecnologias Utilizadas

- **Angular 19** – Framework principal
- **SCSS Modularizado** – Estilização com separação por componente e temática
- **RxJS** – Programação reativa
- **Font Awesome** – Ícones visuais
- **Karma + Jasmine** – Testes unitários
- **Code Coverage** – Cobertura de testes

---

## 📦 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/EduardoDrozda/golden-raspberry-awards-web
cd golden-raspberry-awards-web
```
### 2. Instale as dependências

```bash
npm install
```
### 3. Execute a aplicação

```bash
ng serve ou npm run start
```

### 3. Rode o projeto localmente

> A aplicação estará disponível em: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Testes

Para rodar os testes unitários:

```bash
ng test ou npm run test
```

## 🧪 Testes com Cobertura
Para rodar os testes com cobertura de código:

```bash
ng test --code-coverage ou npm run test:coverage
```

A cobertura será gerada na pasta `coverage/` e você pode abrir o arquivo `index.html` no navegador para visualizar os resultados.
