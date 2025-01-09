import { NextResponse } from "next/server";
import axios from "axios";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

type ApiSku = {
  id: number;
  idProdutoPai: number;
  nome: string;
  codigo: string;
  preco: number;
  precoCusto: number;
  estoque: { saldoVirtualTotal: number };
  tipo: string;
  situacao: string;
  formato: string;
};

function mapApiSkuToPrismaSku(
  apiSku: ApiSku,
  produtoId: number
): Prisma.SkusCreateInput {
  return {
    pai: Number(produtoId),
    idBling: BigInt(apiSku.id),
    codigoBling: apiSku.codigo,
    idProdutoPaiBling: BigInt(apiSku.idProdutoPai),
    nome: apiSku.nome,
    cor: extractCor(apiSku.nome), // Adapte se necessário
    tamanho: extractTamanho(apiSku.nome), // Adapte se necessário
    preco: new Prisma.Decimal(apiSku.preco),
    precoCusto: new Prisma.Decimal(apiSku.precoCusto),
    estoque: apiSku.estoque?.saldoVirtualTotal || null,
    tipo: apiSku.tipo,
    situacao: apiSku.situacao,
    formato: apiSku.formato
  };
}

// Funções auxiliares para extrair cor e tamanho (adapte conforme a lógica necessária)
function extractCor(nome: string): string {
  const match = nome.match(/COR:([^;]+)/);
  return match ? match[1].trim() : "";
}

function extractTamanho(nome: string): string {
  const match = nome.match(/TAMANHO:([^;]+)/);
  return match ? match[1].trim() : "";
}

export async function GET() {
  const apiKey = process.env.BLING_API_KEY;
  const url = `https://api.bling.com.br/Api/v3/skus`;

  try {
    const response = await axios.get(url, {
      params: { apikey: apiKey }
    });

    const skus: ApiSku[] = response.data?.data || [];
    console.log("SKUs recebidos:", skus);

    for (const item of skus) {
      // Buscar o produto pai na tabela `Produtos`
      const produtoPai = await db.produtos.findUnique({
        where: { idBling: BigInt(item.idProdutoPai) }
      });

      if (!produtoPai) {
        console.warn(
          `Produto pai não encontrado para o idProdutoPaiBling: ${item.idProdutoPai}`
        );
        continue; // Pule se o produto pai não for encontrado
      }

      // Mapear os dados da API para o modelo Prisma
      const sku = mapApiSkuToPrismaSku(item, produtoPai.id);

      // Inserir ou atualizar na tabela `Skus`
      await db.skus.upsert({
        where: { idBling: sku.idBling },
        update: sku,
        create: sku
      });
    }

    return NextResponse.json({ message: "SKUs sincronizados com sucesso" });
  } catch (error) {
    console.error("Erro ao sincronizar SKUs:", error);
    return NextResponse.json(
      { error: "Erro ao sincronizar SKUs" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
