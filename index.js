import { program } from 'commander';
import fs from 'node:fs';

const todosPath = "todo.json";

const getJson = path => {
    const data = fs.existsSync(path) ? fs.readFileSync(path) : [];
    try {
        return JSON.parse(data);
    } catch(e) {
        return [];
    }
}

const saveJson = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, '\t'));
}

program
    .command('add [todo]')
    .description("Adiciona um to-do")
    .action(todo => {
        if(!todo) return;
        const data = getJson(todosPath);
        data.push({
            title: todo,
            done: false,
        });
        saveJson(todosPath, data)
    });

program.parse();