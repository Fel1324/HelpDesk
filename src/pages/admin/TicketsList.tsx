import { PenLine } from "lucide-react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Table } from "../../components/table/Table";
import { TableData } from "../../components/table/TableData";
import { TableHeader } from "../../components/table/TableHeader";
import { TableRow } from "../../components/table/TableRow";

export function TicketsList() {
  return (
    <div>
      <Title>Chamados</Title>

      <Table>
        <thead>
          <TableRow className="h-12">
            <TableHeader>Atualizado em</TableHeader>            
            <TableHeader>Título e Serviço</TableHeader>
            <TableHeader>Valor Total</TableHeader>
            <TableHeader>Cliente</TableHeader>
            <TableHeader>Técnico</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="w-13"></TableHeader>
          </TableRow>
        </thead>

        <tbody>
          <TableRow>
            <TableData className="text-xs">13/04/25 20:56</TableData>
            <TableData>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Rede lenta</span>
                <small className="text-xs">Instalação de Rede</small>
              </div>
            </TableData>
            <TableData className="text-sm">R$ 180,00</TableData>
            <TableData>
              <div className="flex items-center gap-2">
                <span>AC</span>
                <span className="text-sm">André Costa</span>
              </div>
            </TableData>
            <TableData>
              <div className="flex items-center gap-2">
                <span>CS</span>
                <span className="text-sm">Carlos Silva</span>
              </div>
            </TableData>
            <TableData>
              <div>
                <span>Encerrado</span>
              </div>
            </TableData>
            <TableData>
              <Button styleVariant="iconSmall" className="bg-gray-500">
                <PenLine size={14} color="#1E2024" />
              </Button>
            </TableData>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
}