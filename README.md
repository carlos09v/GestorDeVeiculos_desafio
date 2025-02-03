# 🚗 Gestor de Veículos

Este projeto é um sistema para gestão de veículos, permitindo cadastro, listagem, atualização e remoção de carros e motos.

<h3><a href="https://gestor-de-veiculos-desafio.vercel.app" target="_blank">👉🏽 Veja o site 👈🏽</a> </h3>
<div align='center'>
    <img width='500' src="https://github.com/carlos09v/GestorDeVeiculos_desafio/blob/main/GestorDeVeiculos/src/assets/tablePreview.jpg?raw=true" alt="Table Preview">
</div>

## 📌 **Tecnologias Utilizadas**
### ✅ **Backend:**
- **Java 21**
- **Spring Boot**
- **Maven**
- **PostgreSQL** (rodando via Docker ou Render.com)

### ✅ **Frontend:**
- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**

### ✅ **Banco de Dados:**
- **PostgreSQL** rodando na **Render.com** *(Plano Free, expira em 04 de março)*
- **Docker Compose** para rodar localmente

---

## ⚙ **1. Configuração do Banco de Dados**
O banco de dados pode ser executado de duas formas:
- **Rodando via Docker Compose**
- **Utilizando o serviço na Render.com** *(Plano Free, expira em 04 de março)*

### ✅ **1.1 Rodando Localmente com Docker**
1. **Instale o Docker** caso ainda não tenha:
   - [Download Docker](https://www.docker.com/get-started/)

2. **Suba o Banco de Dados**:
   ```sh
   docker-compose up -d
   ```
   Isso criará um banco de dados PostgreSQL rodando em **background**.

3. **Para parar o banco:**
   ```sh
   docker-compose down
   ```

### ✅ **1.2 Rodando com Banco na Render.com**
O banco já está disponível na **Render.com**. Basta configurar as variáveis de ambiente no backend para se conectar ao banco remoto.

**⚠ Atenção:** O banco de dados **expira no dia 04 de março** devido ao plano Free da Render.com.

---

## 🚀 **2. Rodando o Backend (Spring Boot)**
### ✅ **2.1 Instalação das Dependências**
1. **Certifique-se de ter o Java 21 e Maven instalados:**
   - [Download Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
   - [Download Maven](https://maven.apache.org/download.cgi)

2. **Navegue até a pasta do backend:**
   ```sh
   cd maven-vehicles
   ```

3. **Instale as dependências:**
   ```sh
   mvn clean install
   ```

4. **Inicie a aplicação:**
   ```sh
   mvn spring-boot:run
   ```

A API estará disponível em **http://localhost:8080**

---

## 🎨 **3. Rodando o Frontend (Vite + React)**
### ✅ **3.1 Instalação das Dependências**
1. **Certifique-se de ter Node.js instalado:**
   - [Download Node.js](https://nodejs.org/)

2. **Navegue até a pasta do frontend:**
   ```sh
   cd GestorDeVeiculos
   ```

3. **Instale as dependências:**
   ```sh
   npm install
   ```

4. **Inicie o frontend:**
   ```sh
   npm run dev
   ```

A aplicação estará disponível em **http://localhost:5173**

---

## 🗄 **4. Arquivos de Banco de Dados (Schema e Seed)**
Para garantir a estrutura e dados iniciais, há dois arquivos:
- **`schema.sql`** → Define as tabelas do banco de dados.
- **`seed.sql`** → Popula o banco com dados iniciais.

### ✅ **Executando os scripts manualmente:**
```sh
psql -U <usuario> -d gestorVeiculos_db -f maven-vehicles/sql/schema.sql
psql -U <usuario> -d gestorVeiculos_db -f maven-vehicles/sql/seed.sql
```

Se o banco estiver rodando via Docker:
```sh
docker exec -i postgres-container psql -U <usuario> -d gestorVeiculos_db < maven-vehicles/sql/schema.sql
docker exec -i postgres-container psql -U <usuario> -d gestorVeiculos_db < maven-vehicles/sql/seed.sql
```

---

## 📡 **5. Endpoints da API**
| Método | Rota                     | Descrição               |
|--------|--------------------------|-------------------------|
| `GET`  | `/veiculos`              | Lista todos os veículos |
| `POST` | `/veiculos`              | Cadastra um veículo     |
| `GET`  | `/veiculos/{id}`         | Busca um veículo por ID |
| `PATCH`| `/veiculos/{id}`         | Atualiza um veículo     |
| `DELETE`| `/veiculos/{id}`        | Remove um veículo       |

---

## 🛠 **6. Como Rodar Tudo Junto**
### ✅ **Passos**
1. **Subir o banco** (caso esteja rodando localmente):
   ```sh
   docker-compose up -d
   ```

2. **Rodar o backend:**
   ```sh
   cd maven-vehicles
   mvn spring-boot:run
   ```

3. **Rodar o frontend:**
   ```sh
   cd GestorDeVeiculos
   npm run dev
   ```

Agora a aplicação estará funcionando 🚀🔥

---

## 🌍 **7. Deploy**
- **Frontend:** Deploy realizado na **Vercel**.
- **Backend:** Deploy realizado na **Render.com**.
- **Banco de Dados:** Disponível na **Render.com** *(Plano Free, expira em 04 de março).*.

---

📌 **Dúvidas?** Entre em contato! 🚀

