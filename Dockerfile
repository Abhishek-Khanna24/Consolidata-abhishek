FROM node:10

WORKDIR /app

COPY ./ /app

RUN npm install -g serve
RUN npm install
RUN npm run build

EXPOSE 5000
EXPOSE 3000
EXPOSE $PORT

CMD ["npm", "start"]