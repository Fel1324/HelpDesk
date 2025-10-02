import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { api } from "../../services/api";

import { PenLine, Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { TableRow } from "../../components/table/TableRow";
import { TableData } from "../../components/table/TableData";

import type { Technician } from "../../types/technician";
import { UserAvatar } from "../../components/UserAvatar";

export function Technicians() {
  const { session } = useAuth();
  const token = session?.token;

  const [technicians, setTechnicians] = useState<Technician[]>([]);

  async function fetchTechnicians() {
    try {
      const resp = await api.get<TechnicianAPIResp[]>("/technicians", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setTechnicians(
        data.map((technician) => ({
          id: technician.id,
          name: technician.name,
          email: technician.email,
          technicianTimes: technician.technicianTimes,
        }))
      );
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os técnicos!");
    }
  }

  useEffect(() => {
    fetchTechnicians();
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <Title className="mb-0 lg:mb-0">Técnicos</Title>
        <Button className="flex items-center justify-center w-10 h-10">
          <Plus size={20} color="#F9FAFA" />
          <span className="hidden">Novo</span>
        </Button>
      </div>

      <Table>
        <thead>
          <tr className="h-12">
            <TableHeader>Nome</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader>Disponibilidade</TableHeader>
            <TableHeader className="w-13"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {technicians.map((technician) => (
            <TableRow key={technician.id}>
              <TableData className="lg:w-[10rem]">
                <div className="flex items-center gap-3">
                  <UserAvatar className="w-7 h-7" username={technician.name} />
                  <span className="text-gray-200 text-sm font-bold">{technician.name}</span>
                </div>
              </TableData>

              <TableData className="text-sm text-gray-200 lg:w-[10rem]">{technician.email}</TableData>

              <TableData className="lg:w-[31.25rem]">
                <div className="flex gap-1 w-fit">                
                  {technician.technicianTimes.map((technicianTime) => (
                    <span
                      key={technicianTime.time.minutes}
                      className="text-gray-400 text-xs font-bold w-14 h-7 border-1 border-gray-500 rounded-4xl flex justify-center items-center"
                    >
                      {technicianTime.time.time}
                    </span>
                  ))}
                </div>
              </TableData>

              <TableData>
                <Button styleVariant="iconSmall" className="bg-gray-500">
                  <PenLine size={14} color="#1E2024" />
                </Button>
              </TableData>              
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
