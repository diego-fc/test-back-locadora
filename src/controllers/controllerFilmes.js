const { PrismaClient } = require("@prisma/client");
const { object, string } = require("zod");

const prisma = new PrismaClient();

async function createFilms(req, res) {
  const { body } = req;
  const createFilmsSchema = object({
    email: string().email(),
    nome: string(),
    acesso: string(),
  });

  const createFilms = async (data) => {
    try {
      const validatedData = createFilmsSchema.parse(data);
      const films = await prisma.filme.create({ data: validatedData });
      return films;
    } catch (error) {
      return null;
    }
  };

  const main = async () => {
    try {
      const newFilms = await createFilms(body);
      if (newFilms === null) {
        return res.json("Email já existe");
      }
      return res.json(newFilms);
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

async function findFilms(req, res) {
  const main = async () => {
    try {
      const filmss = await prisma.filme.findMany();
      return res.status(200).json(filmss);
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

async function updateFilms(req, res) {
  const {
    body: { nome, email, acesso },
    params: { id },
  } = req;

  const main = async () => {
    try {
      const updateddFilms = await prisma.filme.update({
				where: { id: parseInt(id) },
				data: { nome, email, acesso },
			});
      if (updateddFilms === null) {
        return res.json("Não foi possivel atualizar");
      }
      return res.json(updateddFilms);
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

async function deleteFilms(req, res) {
  try {
		const { id } = req.path;
		  const deletedFilms = await prisma.filme.delete({
		    where: { id: parseInt(id) },
		  });
		  res.json(deletedFilms);
	} catch (error) {
		res.status(404).json("Não foi possivel deletar Usuario")
	}
}

module.exports = { createFilms, findFilms, updateFilms, deleteFilms };
