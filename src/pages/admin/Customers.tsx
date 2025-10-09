import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { api } from "../../services/api";

import { Title } from "../../components/Title";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { TableRow } from "../../components/table/TableRow";
import { TableData } from "../../components/table/TableData";

import type { Customer } from "../../types/customer";
import { UserAvatar } from "../../components/UserAvatar";
import { Button } from "../../components/Button";
import { PenLine, Trash } from "lucide-react";
import { Modal } from "../../components/Modal";

export function Customers() {
  const { session } = useAuth();
  const token = session?.token;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  async function fetchCustomers() {
    try {
      const resp = await api.get<CustomerAPIResp[]>("/customers", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setCustomers(
        data.map((customer) => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          avatarUrl: customer.avatar,
        }))
      );

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os clientes!");
    }
  }

  async function fetchCustomer(id: string) {
    try {
      const resp = await api.get<CustomerAPIResp>(`/customers/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setCustomer({
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar,
      })

      setIsDeleteModalOpen(true);

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar o cliente!");
    }
  }

  async function removeCustomer(id: string) {
    try {
      await api.delete(`/customers/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setIsDeleteModalOpen(false);
      await fetchCustomers();
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível remover o cliente!");
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [])  

  return (
    <div>
      <Title>Clientes</Title>

      <Table>
        <thead>
          <tr className="h-12">
            <TableHeader>Nome</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader className="w-22"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableData>
                <div className="flex items-center gap-3">
                  <UserAvatar className="w-7 h-7" username={customer.name} />
                  <span className="text-gray-200 text-sm font-bold capitalize">{customer.name}</span>
                </div>
              </TableData>

              <TableData className="text-sm text-gray-200">{customer.email}</TableData>

             <TableData>
                <div className="flex items-center gap-2">
                  <Button onClick={() => fetchCustomer(customer.id)} styleVariant="iconSmall" className="bg-gray-500">
                    <Trash size={14} color="#D03E3E" />
                  </Button>

                  <Button styleVariant="iconSmall" className="bg-gray-500">
                    <PenLine size={14} color="#1E2024" />
                  </Button>
                </div>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal
        title="Excluir cliente"
        isOpen={isDeleteModalOpen}
        close={setIsDeleteModalOpen}
        bodyContent={
          <div className="px-7 text-gray-200">
            <p className="mb-5">Deseja realmente excluir <span className="font-bold capitalize">{customer.name}</span></p>
            <p>Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.</p>
          </div>
        }
        buttons={
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="w-[9.125rem] bg-gray-500 text-sm text-gray-200 md:w-[11.75rem]"
            >
              Cancelar
            </Button>

            <Button onClick={() => removeCustomer(customer.id)} className="w-[9.125rem] text-sm font-bold md:w-[11.75rem]">
              Sim, excluir
            </Button>
          </div>
        }
      />
    </div>
  )
}
