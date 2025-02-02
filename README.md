# 🚗 Gestor de Veículos

Este projeto é um sistema para gestão de veículos, permitindo cadastro, listagem, atualização e remoção de carros e motos.

## 📌 **Tecnologias Utilizadas**
- **Backend:**
    - Java 21
    - Spring Boot
    - Maven
    - PostgreSQL
- **Frontend:** 
    - React 
    - Vite (para desenvolvimento rápido)
    - Axios (para requisições HTTP)
    - TypeScript
    - Tailwind CSS
- **Banco de Dados:** PostgreSQL rodando em Docker

## Descrição

Este repositório contém uma aplicação que utiliza **Vite** para o frontend (React) e **Spring Boot** para o backend, juntamente com um banco de dados configurado no Docker para persistência de dados. A aplicação está dividida em dois serviços: frontend e backend.

## Pré-requisitos

Antes de rodar a aplicação, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (versão 11 ou superior)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Configurar o Banco de Dados

1. **Criação do Banco de Dados com Docker:**

   Para configurar o banco de dados, você pode usar o `docker-compose`. Na raiz do projeto, você encontrará o arquivo `docker-compose.yml`, que define o serviço do banco de dados (MySQL ou PostgreSQL).

   Para rodar o banco de dados, execute o seguinte comando:

   ```bash
   docker-compose up -d
