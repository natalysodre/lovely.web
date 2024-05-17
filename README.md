# Lovely - Sistema de Cadastro de Adoção de Animais

## Descrição do Projeto

Este projeto é uma solução para gerenciar o cadastro de animais adotados, permitindo o registro, visualização, atualização e exclusão de informações sobre os pets adotados. O sistema foi desenvolvido seguindo um conjunto de instruções para um teste técnico e abrange a implementação do frontend e backend.

## Funcionalidades

- Cadastro de animais adotados e respectivo adotante
- Consulta detalhada de cada animal e respectivo adotante
- Atualização de informações dos animais e respectivos adotantes
- Exclusão de registros de animais adotados e respectivos adotantes

## Tecnologias Utilizadas

### Frontend
- **VueJS**: Framework JavaScript para construção de interfaces de usuário.
- **NuxtJS**: Framework baseado em VueJS para criação de aplicativos universais.
- **Vuetify**: Biblioteca de componentes UI para VueJS, baseada em Material Design.

### Backend
- **C# com .NET**: Utilizado para criar a API.
- **Visual Studio 2022 Community**: IDE utilizada para desenvolvimento do projeto C#.

## Passos para Desenvolvimento

### 1. Esboço das Telas
As telas do sistema foram esboçadas utilizando ferramentas de prototipação para definir a interface de usuário. As principais telas incluem:

- **Tela de Boas-vindas**
- **Tela de Cadastro de Animal e Adotantes**
- **Tela de Consulta de Animais e Adotantes**

### 2. Implementação das Telas
As telas esboçadas foram implementadas utilizando VueJS com o framework Nuxt e Vuetify, seguindo o design definido na etapa anterior. 

### 3. Criação da API com C#
Foi criado um projeto de API em C# utilizando o Visual Studio 2022 Community.

### 4. Endpoints da API
A API contém os seguintes endpoints para gerenciar os dados dos animais:

- **POST /api/Animais**: Cadastrar um novo animal e respectivo adotante
- **GET /api/Animais**: Consultar todos os animais e respectivo adotante
- **PATCH /api/Animais/{id}**: Atualizar informações de um animal e respectivo adotante
- **DELETE /api/Animais/{id}**: Excluir um animal e respectivo adotante
