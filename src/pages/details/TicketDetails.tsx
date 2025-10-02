import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useParams } from "react-router";
import { AxiosError } from "axios";

import { ArrowLeft, CircleCheckBig, Clock2 } from "lucide-react";

import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { TicketStatus } from "../../components/TicketStatus";
import { UserAvatar } from "../../components/UserAvatar";

import type { ticketDetails } from "../../types/ticketDetails";

export function TicketDetails() {
  const { session } = useAuth();
  const user = session?.user;
  const token = session?.token;

  const params = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<ticketDetails>();
  const additionalServices = ticket?.ticketServices.filter(service => service.isAdditional);

  async function fetchTicket(id: string) {
    try {
      const { data } = await api.get<TicketAPIResp>(`/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setTicket({
          id: data.id,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          customer: {
            name: data.customer.name,
            avatarUrl: data.customer.avatarUrl,
          },
          description: data.description,
          status: data.status,
          technician: {
            name: data.technician.name,
            email: data.technician.email,
            avatarUrl: data.technician.avatarUrl,
          },
          title: data.title,
          total: data.ticketServices.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.service.price,
            0
          ),
          service: data.ticketServices[0].service.title,
          ticketServices: data.ticketServices,
        });
      }
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar o chamado!");
    }
  }

  async function updateTicketStatus(id: string | undefined, status: "emAtendimento" | "encerrado") {
    try {
      if(params.id) {
        await api.patch(`/tickets/${id}/status`, { status }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await fetchTicket(params.id);
      }
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível atualizar o status do chamado!");
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchTicket(params.id);
    }
  }, [params.id]);

  return (
    <div className="max-w-[55rem] mx-auto">
      <header className="md:flex items-center justify-between">
        <div>
          <Link
            className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-1 w-fit"
            to="/"
          >
            <ArrowLeft size={14} color="#535964" />
            Voltar
          </Link>

          <Title className="mb-3 md:mb-0 lg:mb-0">Chamado detalhado</Title>
        </div>

        {user?.role !== "customer" && (
          <div className="flex gap-2 md:mt-4.5">
            <Button onClick={() => updateTicketStatus(params.id, "encerrado")} styleVariant="buttonIcon" className="min-w-[7.625rem]">
              <CircleCheckBig size={18} color="#535964" />
              Encerrar
            </Button>

            <Button
              onClick={() => updateTicketStatus(params.id, "emAtendimento")}
              styleVariant="buttonIcon"
              className="bg-gray-200 text-gray-600 md:min-w-[10.125rem]"
            >
              <Clock2 size={18} color="#F9FAFA" />
              {user?.role === "admin" && "Em atendimento"}
              {user?.role === "technician" && "Iniciar atendimento"}
            </Button>
          </div>
        )}
      </header>

      <div className="mt-4 flex flex-col gap-4 max-w-[31.25rem] mx-auto md:mt-6 lg:max-w-full lg:flex-row lg:gap-6">
        <div className="border-1 border-gray-500 rounded-[.625rem] p-5 flex flex-col gap-5 lg:h-fit lg:basis-[50%] xl:p-6">
          <div className="flex flex-col items-end md:flex-row-reverse md:justify-between md:items-center">
            {ticket && <TicketStatus styleVariant={ticket.status} />}
            <h2 className="text-gray-200 text-base font-bold mt-1 self-start">{ticket?.title}</h2>
          </div>

          <div>
            <span className="text-gray-400 text-xs">Descrição</span>
            <p className="text-sm text-gray-200">{ticket?.description}</p>
          </div>

          <div>
            <span className="text-gray-400 text-xs">Serviço</span>
            <p className="text-sm text-gray-200">{ticket?.service}</p>
          </div>

          <div className="flex gap-8 md:gap-16">
            <div>
              <span className="text-gray-400 text-xs block">Criado em</span>
              <span className="text-xs text-gray-200">
                {ticket?.createdAt.toLocaleDateString("pt-BR", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>

            <div>
              <span className="text-gray-400 text-xs block">Atualizado em</span>
              <span className="text-xs text-gray-200">
                {ticket?.updatedAt.toLocaleDateString("pt-BR", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>

          <div>
            <span className="text-gray-400 text-xs mb-2 block">Cliente</span>
            <div className="flex items-center gap-1.5">
              {ticket && <UserAvatar username={ticket?.customer.name} /> }            
              <span className="text-sm text-gray-200 capitalize">{ticket?.customer.name}</span>
            </div>
          </div>
        </div>

        <div className="border-1 border-gray-500 rounded-[.625rem] px-5 py-6 flex flex-col gap-5 lg:h-fit lg:basis-[50%] xl:p-6">
          <div>
            <span className="text-gray-400 text-xs mb-2 block">Técnico responsável</span>
            <div className="flex items-center gap-2">
              {ticket && <UserAvatar className="w-8 h-8 text-base" username={ticket?.technician.name} /> }

              <div className="flex flex-col">
                <span className="text-sm text-gray-200 capitalize">{ticket?.technician.name}</span>
                <small className="text-xs text-gray-300">{ticket?.technician.email}</small>
              </div>
            </div>
          </div>

          <div>
            <span className="text-gray-400 text-xs mb-2 block">Valores</span>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-200">Preço base</span>
              <span className="text-xs text-gray-200">
                {ticket?.ticketServices[0].service.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>

          <div>
            <span className="text-gray-400 text-xs mb-2 block">Adicionais</span>
            <div className="flex flex-col gap-1.5">
              {additionalServices?.map((additional) => (
                <div key={additional.service.id} className="flex justify-between items-center">
                  <span 
                    className="text-xs text-gray-200"
                    title={additional.service.title}
                  >
                    {additional.service.title}
                  </span>

                  <span className="text-xs text-gray-200">
                    {additional.service.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t-1 border-gray-500">
            <span className="text-sm font-bold">Total</span>
            <span className="text-sm font-bold">
              {ticket?.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
