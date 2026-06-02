# Task Tracker CLI

Um gerenciador de tarefas simples em linha de comando, feito em TypeScript com [`commander`](https://www.npmjs.com/package/commander) e persistência em arquivo JSON local.

O objetivo do projeto é permitir criar, atualizar, listar e remover tarefas diretamente do terminal, sem depender de interface gráfica. Depois de instalado globalmente, o comando fica disponível em qualquer pasta do seu sistema.

## Visão Geral

Este projeto funciona como um CLI chamado `todo`. Ele lê e grava os dados em um arquivo `todo.json` no diretório atual onde o comando foi executado. Isso significa que cada pasta pode ter sua própria lista de tarefas independente.

Fluxo geral:

1. Você executa um comando no terminal, como `todo add "Estudar TypeScript"`.
2. O CLI lê o arquivo `todo.json` da pasta atual.
3. Ele altera os dados em memória.
4. Salva o resultado de volta no mesmo arquivo.

## Instalação

### Requisitos

- Node.js instalado.
- npm disponível no terminal.

### Instalação local para desenvolvimento

Se você estiver trabalhando no projeto dentro da pasta do repositório:

```bash
npm install
```

### Instalação global

Para usar o sistema de qualquer lugar do terminal, instale o projeto globalmente a partir da raiz do repositório:

```bash
npm install -g .
```

Depois disso, o comando `todo` passa a ficar disponível globalmente.

## Como Usar

### Adicionar uma tarefa

```bash
todo add "Comprar pão"
```

Isso cria uma nova tarefa com um `id` automático, título informado, status inicial `created` e o campo `created_at` preenchido com a data e hora da criação.

### Atualizar uma tarefa

Você pode alterar o título, o status ou deletar uma tarefa usando o `id`:

```bash
todo upd 1 --todo "Comprar pão e café"
todo upd 1 --status done
todo upd 1 --delete
```

Quando uma tarefa é atualizada, o campo `update_at` também é registrado para indicar a última modificação.

### Listar tarefas

```bash
todo list
```

Filtros disponíveis:

```bash
todo list --done
todo list --created
todo list --inprogress
```

## Estrutura dos Dados

As tarefas são salvas em um arquivo `todo.json` com uma lista de objetos no formato:

```json
[
  {
    "id": 1,
    "title": "Exemplo de tarefa",
    "status": "created",
    "created_at": "2026-06-02T12:00:00.000Z",
    "update_at": "2026-06-02T12:30:00.000Z"
  }
]
```

Campos:

- `id`: identificador numérico incremental.
- `title`: descrição da tarefa.
- `status`: situação atual da tarefa.
- `created_at`: data de criação da tarefa.
- `update_at`: data da última atualização da tarefa.

## Funcionamento Interno

O projeto é bem direto:

- O ponto de entrada está em `src/index.ts`.
- A biblioteca `commander` faz o parsing dos comandos e opções.
- O módulo `node:fs` lê e escreve o arquivo `todo.json`.
- Se o arquivo ainda não existir, o CLI começa com uma lista vazia.
- Toda tarefa criada recebe um timestamp em `created_at`.
- Toda tarefa atualizada recebe um timestamp em `update_at`.

### Regras de persistência

- O arquivo `todo.json` é sempre buscado no diretório atual.
- Se você rodar o comando em outra pasta, outra base de tarefas será usada.
- O histórico das tarefas fica totalmente armazenado em JSON, sem banco de dados.
- Como os dados são salvos no arquivo local, os timestamps ficam persistidos junto com cada tarefa.

## Desenvolvimento

Para executar o projeto localmente durante o desenvolvimento, use o seu fluxo preferido de compilação ou execução TypeScript. O código fonte principal está em:

- `src/index.ts`

## Observações Importantes

- O comando publicado pelo pacote é `todo`.
- A instalação global com `npm install -g .` é o que permite usar o CLI em qualquer diretório.
- Como os dados ficam no arquivo local `todo.json`, cada pasta pode manter sua própria lista.

## Exemplo de Uso

```bash
todo add "Enviar relatório"
todo add "Revisar pull request"
todo list
todo upd 1 --status done
todo list --done
```

## Tecnologias

- TypeScript
- Node.js
- commander
- JSON como armazenamento local

## Origem do Projeto

Este projeto foi inspirado no desafio do roadmap.sh:

- https://roadmap.sh/projects/task-tracker

## Licença

Este projeto está sob a licença ISC.