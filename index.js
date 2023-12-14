const express = require("express");
const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");
const { object, string } = require("zod");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/user/create", (req, res) => {
  console.log("teste");
});

server.post("/user/create", (req, res) => {
  const { body } = req;
  const prisma = new PrismaClient();

  const createUserSchema = object({
    email: string().email(),
    nome: string(),
    acesso: string(),
  });

  const createUser = async (data) => {
    try {
      const validatedData = createUserSchema.parse(data);
      const user = await prisma.pessoa.create({ data: validatedData });
      return user;
    } catch (error) {
      return null
    }
  };

  const main = async () => {
    try {
      const newUser = await createUser(body);
      if (newUser === null) {
        return res.json("Email já existe");
      }
      return res.json(newUser);
    } catch (error) {}
  };

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

server.listen(3001);
