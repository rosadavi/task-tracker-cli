#!/usr/bin/env node

import { program } from "commander";
import fs from "node:fs";

const todosPath = "todo.json";

const getJson = (path: string) => {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path).toString());
  }

  return [];
};

const saveJson = (path: string, data: JSON) => {
  fs.writeFileSync(path, JSON.stringify(data, null, "\t"));
};

program
  .command("add [todo]")
  .description("Adiciona um to-do")
  .action((todo, option) => {
    if (!todo) return;
    const data = getJson(todosPath);
    const id = data.at(-1)?.id;
    data.push({
      id: id == undefined ? 1 : id + 1,
      title: todo,
      status: "created",
    });
    saveJson(todosPath, data);
    console.log("to-do adicionado - ID #" + data.id);
  });

program
  .command("upd [id]")
  .description("Atualiza um to-do")
  .option("-t, --todo, <todo>", "A fazer do to-do")
  .option("-s, --status, <status>", "Status do to-do")
  .option("-d, --delete", "Deletar do to-do")
  .action((id, options) => {
    if (!id) {
      console.log("Defina o ID do todo a ser atualizado");
      return;
    }
    if (options.delete) {
      const data = getJson(todosPath);
      const todoDeleted = data.filter((todo: any) => {
        return todo.id != id;
      });
      saveJson(todosPath, todoDeleted);
      console.log("to-do deletado - ID #" + id);
      return;
    }
    if (!options.todo && !options.status && !options.delete) {
      console.log("Defina pelo menos uma acao de atualizacao para o todo");
      return;
    }
    const data = getJson(todosPath);
    const todoUpdated = data.map((todo: any) => {
      if (todo.id == id) {
        return {
          ...todo,
          title: options.todo ? options.todo : todo.title,
          status: options.status ? options.status : todo.status,
        };
      }

      return todo;
    });
    saveJson(todosPath, todoUpdated);
    console.log("to-do atualizado - ID #" + id);
  });

program
  .command("list")
  .description("Lista todo o to-do com parametros")
  .option("-d, --done,", "Concluidos")
  .option("-c, --created,", "Nao concluidos")
  .option("-i, --inprogress,", "Em progresso")
  .action((options) => {
    const data = getJson(todosPath);

    if (options.done) {
      const done = data.filter((todo: any) => {
        return todo.status == "done";
      });

      console.log(done);
      return;
    }

    if (options.created) {
      const created = data.filter((todo: any) => {
        return todo.status == "created";
      });

      console.log(created);
      return;
    }

    if (options.inprogress) {
      const inProgress = data.filter((todo: any) => {
        return todo.status == "in progress";
      });

      console.log(inProgress);
      return;
    }

    console.log("Nao foi possivle encontrar tarefas com esse parametro");
    return;
  });

program.parse();
