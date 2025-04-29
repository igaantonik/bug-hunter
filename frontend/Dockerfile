FROM node:20

WORKDIR /code/app

COPY app/package*.json ./

COPY app .

EXPOSE 5173

CMD ["sh", "-c", "npm install --include=optional && npm run dev -- --host 0.0.0.0"]
