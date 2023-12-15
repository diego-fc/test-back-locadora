const { PrismaClient } = require("@prisma/client");
const { object, string } = require("zod");

const prisma = new PrismaClient();

async function createUser(req, res) {
  const { body } = req;
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
      return null;
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
}

async function findUser(req, res) {
  const main = async () => {
    try {
      const users = await prisma.pessoa.findMany();
      return res.status(200).json(users);
    } catch (error) {}
  };

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function updateUser(req, res) {
  const {
    body: { nome, email, acesso },
    params: { id },
  } = req;

  const main = async () => {
    try {
      const updateddUser = await prisma.pessoa.update({
				where: { id: parseInt(id) },
				data: { nome, email, acesso },
			});
      if (updateddUser === null) {
        return res.json("Não foi possivel atualizar");
      }
      return res.json(updateddUser);
    } catch (error) {}
  };

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

async function deleteUser(req, res) {
  try {
		const { id } = req.params;
		  const deletedUser = await prisma.pessoa.delete({
		    where: { id: parseInt(id) },
		  });
		  res.json(deletedUser);
	} catch (error) {
		console.log("🚀 ~ file: controllerUsuario.js:96 ~ deleteUser ~ error:", error)
		res.status(404).json(error)
	}
}

module.exports = { createUser, findUser, updateUser, deleteUser };
