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
  .option("-s, --status [status]", "Status inicial do to-do")
  .action((todo, option) => {
    if (!todo) return;
    const data = getJson(todosPath);
    data.push({
      title: todo,
      done: option.status == "true" ? true : false,
    });
    saveJson(todosPath, data);
  });

program.parse();
