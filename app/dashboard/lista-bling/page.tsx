import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { TabelaConexaoBling } from "./tabelaConexaoBling";

export default function ListaBling() {
  return (
    <Card className="max-w-full w-full">
      <CardHeader>
        <CardTitle>Lista de Bling</CardTitle>
        <CardDescription>
          Gerencie os dados de sua conexão com o Bling
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-full">
        <TabelaConexaoBling />
      </CardContent>
    </Card>
  );
}
