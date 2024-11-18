# Use a imagem base do Ubuntu
FROM ubuntu:22.04

# Atualize o sistema e instale dependências básicas
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    python3 \
    g++ \
    make

# Instale o Node.js (use uma versão LTS compatível, por exemplo, 18)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências, garantindo a recompilação
RUN npm install --build-from-source

RUN npm install bcrypt

# Copie o restante da aplicação
COPY . .

# Compile o código
RUN npm run build

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
