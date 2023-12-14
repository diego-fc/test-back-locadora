const { PrismaClient } = require("@prisma/client");
const { object, string, number } = require("zod");

const prisma = new PrismaClient();

async function createFilms(req, res) {
  const { body } = req;
  const createFilmsSchema = object({
    titulo: string(),
    imagem: string(),
    sinopse: string(),
    elenco: string(),
    categoria: string(),
    valorLocacao: number(),
    quantidadeDisponivel: number(),
    anoLancamento: number(),
  });

  const createFilms = async (data) => {
    try {
      const validatedData = createFilmsSchema.parse(data);
      console.log(
        "🚀 ~ file: controllerFilmes.js:22 ~ createFilms ~ data:",
        data
      );
      const films = await prisma.filme.create({ data: validatedData });
      return films;
    } catch (error) {
      console.log(
        "🚀 ~ file: controllerFilmes.js:20 ~ createFilms ~ error:",
        error
      );
      return null;
    }
  };

  const main = async () => {
    try {
      const newFilms = await createFilms(body);
      if (newFilms === null) {
        return res.status(400).json("Email já existe");
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
    body: {
      titulo,
      anoLancamento,
      categoria,
      elenco,
      imagem,
      quantidadeDisponivel,
      sinopse,
      valorLocacao,
    },
    params: { id },
  } = req;

  const main = async () => {
    try {
      const updateddFilms = await prisma.filme.update({
        where: { id: parseInt(id) },
        data: {
          titulo,
          anoLancamento,
          categoria,
          elenco,
          imagem,
          quantidadeDisponivel,
          sinopse,
          valorLocacao,
        },
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
    const { id } = req.params;
    const deletedFilms = await prisma.filme.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedFilms);
  } catch (error) {
    res.status(404).json("Não foi possivel deletar Usuario");
  }
}

module.exports = { createFilms, findFilms, updateFilms, deleteFilms };
