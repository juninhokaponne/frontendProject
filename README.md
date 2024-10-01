# Frontend do Projeto

Este é o frontend do projeto. Aqui você encontrará instruções para instalar e executar o projeto.

## Pré-requisitos

Antes de começar, verifique se você tem os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/juninhokaponne/frontendProject.git

cd frontendProject
```

2. **Instale as dependências**

```bash
npm install
```

## Execução

Para executar o projeto, execute o seguinte comando:

```bash
npm run dev
```

O aplicativo estará disponível em http://localhost:5173 por padrão.

## Testes

Para executar os testes, execute o seguinte comando:

```bash
npm run test
```

### Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
/src
  ├── components         # Componentes reutilizáveis
  ├── pages              # Páginas do aplicativo
  ├── services           # Serviços e chamadas à API
  ├── redux              # Gerenciamento de estado global
  └── http               # Configuração do axios
```
