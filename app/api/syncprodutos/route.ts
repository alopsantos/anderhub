import { NextResponse } from "next/server";
import axios from "axios";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

type ApiProduto = {
  id: number;
  idBling: number;
  codigo: string;
  nome: string;
  preco: number;
  precoCusto: number;
  tipo: string;
  situacao: string;
  formato: string;
};

function mapApiProdutoToPrismaProduto(
  apiProduto: ApiProduto
): Prisma.ProdutosCreateInput {
  return {
    idBling: apiProduto.id,
    codigoBling: apiProduto.codigo,
    nome: apiProduto.nome,
    preco: Number(apiProduto.preco),
    precoCusto: Number(apiProduto.precoCusto),
    tipo: apiProduto.tipo,
    situacao: apiProduto.situacao,
    formato: apiProduto.formato
  };
}
export async function GET() {
  const apiKey = process.env.BLING_API_KEY;
  const url = `https://api.bling.com.br/Api/v3/produtos?pagina=101&limite=201&tipo=P`;

  try {
    const response = await axios.get(url, {
      params: { apikey: apiKey },
      headers: {
        Authorization: `Bearer 87aab273008b2200a8ba2a6d14459fee3bae763c`
      }
    });

    const produtos: ApiProduto[] = response.data?.data || [];
    // console.log(produtos);
    // const dadosApi = {
    //   idBling: produtos.data.id,
    //   codigoBling: produtos.data.codigo,
    //   nome: produtos.data.nome,
    //   preco: parseFloat(produtos.data.preco),
    //   precoCusto: parseFloat(produtos.data.precoCusto),
    //   tipo: produtos.data.tipo,
    //   situacao: produtos.data.situacao,
    //   formato: produtos.data.formato
    // };

    for (const item of produtos) {
      const produto = mapApiProdutoToPrismaProduto(item);

      await db.produtos.upsert({
        where: { idBling: produto.idBling },
        update: {
          codigoBling: produto.codigoBling,
          nome: produto.nome,
          preco: produto.preco,
          precoCusto: produto.precoCusto,
          tipo: produto.tipo,
          situacao: produto.situacao,
          formato: produto.formato
        },
        create: produto
      });
    }

    return NextResponse.json({ message: "Produtos sincronizados com sucesso" });
  } catch (error) {
    console.error("Erro ao sincronizar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao sincronizar produtos" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
