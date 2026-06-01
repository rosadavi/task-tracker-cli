import { program } from 'commander';

program
    .command('add [todo]')
    .description("Adiciona um to-do")
    .action(todo => {
        console.log(todo);
    });

program.parse();