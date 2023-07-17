# Descrição
O Aplicativo foi criado como parte de teste para a empresa `PROFECTUM`. Consiste básicamente em extrair informações da rota externa do site **TMDB**, e fazer a administração desses dados de acordo com os serviços requeridos.

# Executando o banco de dados 
Execute o comando do Docker compose para instalar a base de dados.
```bash
# obs: é necessário ter instalado docker
$ docker compose up -d
```

# Executando a aplicação
> Entre na pasta backend e execute os comandos:
```bash
# Instala o NestJS global na máquina
$ npm i -g @nestjs/cli

# Instala todas as dependências
$ yarn

# Monta a estrutura do Banco de Dados no MongoDB
$ yarn prisma db push

# Gera as tabelas do Banco de Dados na Aplicação
$ yarn prisma generate

# Inicializa o Backend da aplicação
$ yarn run start

```

> Entre na pasta frontend e execute os comandos:
```bash
# Instala o angular global na máquina
$ npm install -g @angular/cli

# Instala todas as dependências
$ npm install

# Inicializa o Frontend da aplicação
$ ng serve

```

# Acessando a Aplicação
> O teste do backend pode ser executado via Swagger navegando em http://localhost:3000/swagger

> O frontend pode ser acessado navegando em http://localhost:4200/