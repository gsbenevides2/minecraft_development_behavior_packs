<h1 align="center">Develompment Behavior Packs</h1>
<p align="center">Este repositório contém os Pacotes de Comportamentos utilizados em para criar funcionalidades exclusivas e experiencias personalizadas no meu servidor de Minecraft pessoal.</p>

## Estrutura de Pastas
- auth: Pacote de autenticação, a partir da nametag de um usuário e com requisições para meu servidor http, verifico se um jogador tem permissão para jogar no servidor, caso ele não tenha ele é expulso.
- helper: Disponibiliza um formulário acessivel através de !helper no chat. Com o formulário é possivel salvar coordenados e teleportar para as mesmas que são salvas em um servidor http.
- mob_reguler: Remove mobs hóstils de spawnarem em uma região específica no caso minha casa.

## Techs Usadas:
- [Documentação sobre Minecraft Bedrock Script API -  Experimental](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/?view=minecraft-bedrock-experimental)
- Webpack
- Typescript
