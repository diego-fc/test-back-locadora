-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "acesso" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL,
    "imagem" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "elenco" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "valorLocacao" DOUBLE PRECISION NOT NULL,
    "quantidadeDisponivel" INTEGER NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locacao" (
    "id" SERIAL NOT NULL,
    "locadorId" INTEGER NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL,
    "dataDevolucao" TIMESTAMP(3) NOT NULL,
    "horaLimiteDevolucao" TIMESTAMP(3) NOT NULL,
    "valorMultaAtraso" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "situacao" TEXT NOT NULL,

    CONSTRAINT "Locacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");

-- AddForeignKey
ALTER TABLE "Locacao" ADD CONSTRAINT "Locacao_locadorId_fkey" FOREIGN KEY ("locadorId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locacao" ADD CONSTRAINT "Locacao_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
