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

export function Customers() {
  const { session } = useAuth();
  const token = session?.token;

  const [customers, setCustomers] = useState<Customer[]>([]);

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
                  <Button styleVariant="iconSmall" className="bg-gray-500">
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
    </div>
  )
}
