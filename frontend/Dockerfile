FROM node:20.10.0

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .

CMD ["npm", "run", "dev"]
