FROM ubuntu
EXPOSE 80
WORKDIR /app
RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN mkdir /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
RUN npm install nodemailer

