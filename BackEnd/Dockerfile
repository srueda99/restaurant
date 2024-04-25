FROM ubuntu
EXPOSE 80
WORKDIR /app
RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
COPY package.json /app
COPY package-lock.json /app
RUN npm install