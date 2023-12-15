const { PrismaClient } = require("@prisma/client");
const { object, string, number } = require("zod");

const prisma = new PrismaClient();

async function createLocation(req, res) {
  const { body } = req;
  const createLocacaoSchema = object({
    locadorId: number(),
    filmeId: number(),
    dataRetirada: string(),
    dataDevolucao: string(),
    horaLimiteDevolucao: string(),
    valorMultaAtraso: number(),
    valorTotal: number(),
    situacao: string(),
  });

  const createLocacao = async (data) => {
    try {
      const validatedData = createLocacaoSchema.parse(data);
      const locacao = await prisma.locacao.create({ data: validatedData });
      return locacao;
    } catch (error) {
      console.log(
        "🚀 ~ file: controllerLocation.js:20 ~ createLocacao ~ error:",
        error
      );
      return null;
    }
  };

  const main = async () => {
    try {
      const newLocacao = await createLocacao(body);
      if (newLocacao === null) {
        return res.json("Não foi possivel criar locação");
      }
      return res.json(newLocacao);
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

async function findLocation(req, res) {
  const main = async () => {
    try {
      const locacao = await prisma.locacao.findMany();
      return res.status(200).json(locacao);
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

async function updateLocation(req, res) {
  const {
    body: { nome, email, acesso },
    params: { id },
  } = req;

  const main = async () => {
    try {
      const updateddLocacao = await prisma.locacao.update({
        where: { id: parseInt(id) },
        data: { nome, email, acesso },
      });
      if (updateddLocacao === null) {
        return res.json("Não foi possivel atualizar");
      }
      return res.json(updateddLocacao);
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

async function deleteLocation(req, res) {
  try {
    const { id } = req.path;
    const deletedLocacao = await prisma.locacao.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedLocacao);
  } catch (error) {
    res.status(404).json("Não foi possivel deletar Usuario");
  }
}

module.exports = {
  createLocation,
  findLocation,
  updateLocation,
  deleteLocation,
};
