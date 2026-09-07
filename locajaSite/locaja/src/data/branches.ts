export type Branch = {
  id: string;
  name: string;
  city: string;
  kind: "Matriz" | "Filial";
  address: string;
  neighborhood: string;
  state: string;
  phone: string;
  mobile?: string;
  hours: string;
  saturday?: string;
  mapQuery: string;
};

export const branches: Branch[] = [
  {
    id: "jaragua",
    name: "Jaraguá do Sul",
    city: "Jaraguá do Sul",
    kind: "Matriz",
    address: "Rua Francisco Piermann, 15",
    neighborhood: "Vila Lenzi",
    state: "SC",
    phone: "(47) 3376-3684",
    mobile: "(47) 99968-6926",
    hours: "Seg a Sex, 07:30–12:00 e 13:00–18:00",
    saturday: "Sábado, 07:30–11:30",
    mapQuery: "Rua Francisco Piermann, 15, Vila Lenzi, Jaraguá do Sul, SC",
  },
  {
    id: "sao-bento",
    name: "São Bento do Sul",
    city: "São Bento do Sul",
    kind: "Filial",
    address: "Rua Imigrante João Grossl, 282",
    neighborhood: "Colonial",
    state: "SC",
    phone: "(47) 3012-7870",
    mobile: "(47) 99667-5015",
    hours: "Seg a Sex, 07:30–12:00 e 13:12–17:30",
    mapQuery: "Rua Imigrante João Grossl, 282, Colonial, São Bento do Sul, SC",
  },
  {
    id: "itapema",
    name: "Itapema",
    city: "Itapema",
    kind: "Filial",
    address: "Rua 462, 406",
    neighborhood: "Jardim Praia Mar",
    state: "SC",
    phone: "(47) 3269-1684",
    hours: "Seg a Sex, 07:30–12:00 e 13:12–17:30",
    mapQuery: "Rua 462, 406, Jardim Praia Mar, Itapema, SC",
  },
  {
    id: "itajai",
    name: "Itajaí",
    city: "Itajaí",
    kind: "Filial",
    address: "Rua Abdon David Schmitt, 2211",
    neighborhood: "São Judas",
    state: "SC",
    phone: "(47) 3508-0644",
    hours: "Seg a Sex, 07:30–12:00 e 13:12–17:30",
    mapQuery: "Rua Abdon David Schmitt, 2211, São Judas, Itajaí, SC",
  },
  {
    id: "porto-belo",
    name: "Porto Belo",
    city: "Porto Belo",
    kind: "Filial",
    address: "Av. Colombo Machado Sales, 850",
    neighborhood: "Jardim Dourado",
    state: "SC",
    phone: "(47) 3368-7249",
    hours: "Seg a Sex, 07:30–12:00 e 13:12–17:30",
    mapQuery: "Avenida Colombo Machado Sales, 850, Jardim Dourado, Porto Belo, SC",
  },
  {
    id: "penha",
    name: "Penha",
    city: "Penha",
    kind: "Filial",
    address: "Rod. Paulo Stuart Wright, 655",
    neighborhood: "Praia Alegre",
    state: "SC",
    phone: "(47) 3224-2982",
    hours: "Seg a Sex, 07:30–12:00 e 13:12–17:30",
    mapQuery: "Rodovia Paulo Stuart Wright, 655, Praia Alegre, Penha, SC",
  },
];

export const defaultWhatsApp = "(47) 99968-6926";
