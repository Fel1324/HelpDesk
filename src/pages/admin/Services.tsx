import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { api } from "../../services/api";

import { Ban, CircleCheck, PenLine, Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { TableRow } from "../../components/table/TableRow";
import { TableData } from "../../components/table/TableData";

import type { Service } from "../../types/service";

export function Services() {
  const { session } = useAuth();
  const token = session?.token;

  const [services, setServices] = useState<Service[]>([]);

  async function fetchServices() {
    try {
      const resp = await api.get<ServiceAPIResp[]>("/services", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setServices(
        data.map((service) => ({
          id: service.id,
          title: service.title,
          price: service.price,
          status: service.status,
        }))
      );
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os serviços!");
    }
  }

  async function updateServiceStatus(status: "ativo" | "inativo", id: string) {
    try {
      await api.patch(`/services/${id}/status`, {status}, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      await fetchServices();

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível atualizar o status do serviço!");      
    }
  }

  useEffect(() => {
    fetchServices();
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <Title className="mb-0 lg:mb-0">Serviços</Title>
        <Button className="text-sm flex items-center justify-center basis-10 h-10 lg:basis-[5.75rem] lg:gap-2">
          <Plus size={18} color="#F9FAFA" />
          <span className="hidden lg:block">Novo</span>
        </Button>
      </div>

      <Table>
        <thead>
          <tr className="h-12">
            <TableHeader>Título</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="w-[8.625rem]"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <TableRow id={service.id} key={service.id}>
              <TableData className="text-gray-200 font-bold text-sm">{service.title}</TableData>

              <TableData className="text-gray-200 text-sm w-[20.5rem]">
                {service.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableData>

              <TableData className="w-[6.75rem]">
                {service.status === "ativo" ? (
                  <span className="py-1.5 px-3 rounded-4xl bg-feedback-done-20 font-bold text-xs text-feedback-done">
                    Ativo
                  </span>
                ) : (
                  <span className="py-1.5 px-3 rounded-4xl bg-feedback-danger-20 font-bold text-xs text-feedback-danger">
                    Inativo
                  </span>
                )}
              </TableData>

             <TableData>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateServiceStatus(service.status === "ativo" ? "inativo" : "ativo", service.id)} className="cursor-pointer"
                  >
                    <div className="text-gray-300 text-xs font-bold w-[4.75rem]">
                      {service.status === "ativo" ? (
                        <span className="flex items-center gap-2">
                          <Ban size={14} color="#535964" />
                          Desativar
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CircleCheck size={14} color="#535964" />
                          Reativar
                        </span>
                      )}
                    </div>
                  </button>

                  <Button styleVariant="iconSmall" className="bg-gray-500">
                    <PenLine size={14} color="#1E2024" />
                  </Button>
                </div>
              </TableData>              
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
