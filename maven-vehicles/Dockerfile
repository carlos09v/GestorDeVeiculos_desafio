# > Estágio de construção
FROM maven:3.9.6-eclipse-temurin-21 AS build

# > Define o diretório de trabalho
WORKDIR /app

# > Copia os arquivos do projeto
COPY pom.xml ./
COPY src ./src

# > Compila o projeto
RUN mvn clean package -DskipTests

# > Etapa para configurar o ambiente de execução
FROM eclipse-temurin:21

# > Define o diretório de trabalho
WORKDIR /app

# > Copia o JAR gerado no estágio anterior
COPY --from=build /app/target/maven-vehicles-1.0-SNAPSHOT.jar /app/app.jar

# > Expõe a porta do backend (8080)
EXPOSE 8080

# > Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
