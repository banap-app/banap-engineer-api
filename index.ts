import express, { urlencoded } from 'express';
import cors from 'cors';
import ora from 'ora';
import chalk from 'chalk';
import figlet from 'figlet';
import dotenv from 'dotenv';
import EngineerRouterFactory from './src/Enginner/Infrastructure/Factory/Api/EngineerRouterFactory.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT_APP || 55054;

const engineerRouter = EngineerRouterFactory.create()

const corsOptions = {
    origin: '*', // Permite todos os domínios
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite esses métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite esses cabeçalhos
  };

// Configuração do middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));

app.use('/engineer', engineerRouter.getRouter())

const spinner = ora({
  text: 'Iniciando o servidor...',
  color: 'magenta',
  spinner: 'dots8Bit',
});
spinner.start();
setTimeout(() => {
  app.listen(PORT, () => {
    spinner.stop();
    console.log(chalk.green(figlet.textSync(`Servidor rodando na porta ${PORT}`, { font: 'Small' })));
  });
}, 3000);
