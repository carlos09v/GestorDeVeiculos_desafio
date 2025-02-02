# Pro deploy no render.com

# > Estágio de construção
## FROM ubuntu:latest AS build
FROM maven:3.8.4-openjdk-21 AS build

# > Atualiza o apt-get e instala o openjdk (não necessário já que estamos usando uma imagem base com JDK)
RUN apt-get update
# RUN apt-get install openjdk-21-jdk -y

# > Copia o código fonte para o diretório de trabalho
COPY . /app

# > Define o diretório de trabalho
WORKDIR /app

# RUN apt-get install maven -y
RUN mvn clean install

# > Expõe a porta do backend (8080)
EXPOSE 8080

# > Etapa para configurar o ambiente de execução
FROM openjdk:21-jdk-slim

# > Cria um diretório para o aplicativo
WORKDIR /app

COPY --from=build /target/maven-vehicles-1.0-SNAPSHOT.jar app.jar

# > Comando para rodar a aplicação
ENTRYPOINT [ "java", "-jar", "/app/app.jar" ]