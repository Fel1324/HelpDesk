import { Input } from "../../components/form/Input";
import { SelectInput } from "../../components/form/SelectInput";
import { TextArea } from "../../components/form/TextArea";
import { FormLayout } from "../../components/layouts/FormLayout";
import { Title } from "../../components/Title";

export function CreateTicket() {
  return (
    <div>
      <Title>Novo chamado</Title>

      <form>
        <FormLayout className="p-5">
          <h3 className="text-base font-bold text-gray-200">Informações</h3>
          <p className="text-gray-300 text-xs mt-1">
            Configure os dias e horários em que você está disponível para atender chamados
          </p>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <Input
                label="Título"
                placeholder="Digite um título para o chamado"
              />
            </div>

            <div>
              <TextArea
                id="description"
                label="Descrição"
                placeholder="Descreva o que está acontecendo"
              />
            </div>

            <div>
              <SelectInput id="service" label="Serviço">
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
                <option value="support">Suporte Técnico</option>
              </SelectInput>
            </div>
          </div>
        </FormLayout>
      </form>
    </div>
  );
}