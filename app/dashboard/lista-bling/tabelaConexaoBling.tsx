"use server";
import { getConexaoBling } from "@/app/(auth)/conexaobling/actions";

export async function TabelaConexaoBling() {
  const dados = await getConexaoBling();
  console.log(dados);
  return (
    <table className="table-fixed border border-blue-800 rounded-lg">
      <thead>
        <tr>
          <th>teste</th>
          <th>Artist</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
  );
}
