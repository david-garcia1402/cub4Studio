import brasileiroMarrom from '../assets/services/brasileiro-marrom.webp'
import efeitoCisne from '../assets/services/efeito-cisne.webp'
import efeitoFoxEyes from '../assets/services/efeito-fox-eyes.webp'
import kimKardashian from '../assets/services/kim-kardashian.webp'
import sirenaCisne from '../assets/services/sirena-cisne.webp'
import volumeAura from '../assets/services/volume-aura.webp'
import volumeBrasileiro from '../assets/services/volume-brasileiro.webp'
import volumeEgipcio from '../assets/services/volume-egipcio-5d.webp'

export const business = {
  name: 'Gabrieli Lazzarotto',
  role: 'Lash Designer',
  handle: '@gabilazzbeauty',
  instagram: 'https://www.instagram.com/gabilazzbeauty/',
  phoneDisplay: '(47) 99749-6047',
  phoneE164: '5547997496047',
  whatsappE164: '5547997496047',
  address: {
    street: 'Rua Josef Fontana, 42 - Sala 06',
    district: 'Centro',
    city: 'Jaraguá do Sul - SC',
    zip: '89251-710',
  },
  mission: 'Minha missão é realçar a beleza que existe em você!',
  rating: { value: '5,0', count: 5 },
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'Gabrieli Lazzarotto Lash Designer, Rua Josef Fontana, 42 - Sala 06 - Centro, Jaraguá do Sul - SC, 89251-710',
    ),
  googleMapsEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Rua Josef Fontana, 42 - Centro, Jaraguá do Sul - SC, 89251-710') +
    '&output=embed&z=16',
} as const

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsappE164}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const defaultWhatsappMessage =
  'Olá, Gabrieli! Vi seu site e gostaria de agendar um horário para extensão de cílios. 💗'

export type Service = {
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  tags: string[]
  featured?: boolean
}

export const services: Service[] = [
  {
    slug: 'volume-brasileiro',
    name: 'Volume Brasileiro',
    tagline: 'O queridinho',
    description:
      'Uma opção popular para quem busca cílios mais cheios, enquanto mantém um aspecto natural e confortável.',
    image: volumeBrasileiro,
    tags: ['Volume', 'Natural'],
    featured: true,
  },
  {
    slug: 'volume-egipcio-5d',
    name: 'Volume Egípcio 5D',
    tagline: 'O mais ousado',
    description:
      'Esse é o modelo mais ousado! Ele traz volume e um acabamento mais cheio. Ideal para quem quer os cílios bem volumosos.',
    image: volumeEgipcio,
    tags: ['Volume', 'Marcante'],
  },
  {
    slug: 'efeito-fox-eyes',
    name: 'Efeito Fox Eyes',
    tagline: 'Olhar alongado',
    description:
      'Esse efeito proporciona alongamento no canto externo, criando um olhar elegante e alongado.',
    image: efeitoFoxEyes,
    tags: ['Efeito', 'Alongado'],
    featured: true,
  },
  {
    slug: 'brasileiro-marrom',
    name: 'Brasileiro Marrom',
    tagline: 'Suave e delicado',
    description:
      'Proporciona um olhar marcante e natural. Com fios marrom, é ideal para realçar o olhar de forma mais suave e delicada.',
    image: brasileiroMarrom,
    tags: ['Fios marrom', 'Natural'],
  },
  {
    slug: 'efeito-cisne',
    name: 'Efeito Cisne',
    tagline: 'Elegância no canto externo',
    description:
      'Esse efeito proporciona alongamento delicado no canto externo, criando um olhar elegante e alongado.',
    image: efeitoCisne,
    tags: ['Efeito', 'Elegante'],
  },
  {
    slug: 'kim-kardashian',
    name: 'Kim Kardashian',
    tagline: 'Volume com leveza',
    description:
      'Fica super volumoso, mas com um formato que mantém a leveza. Perfeito para quem quer algo que se destaque sem ser exagerado demais.',
    image: kimKardashian,
    tags: ['Volume', 'Destaque'],
  },
  {
    slug: 'volume-aura',
    name: 'Volume Aura',
    tagline: 'Natural com destaque',
    description:
      'Um modelo mais natural, dando um maior destaque porém com um volume suave, sem exageros.',
    image: volumeAura,
    tags: ['Volume', 'Natural'],
  },
  {
    slug: 'sirena-cisne',
    name: 'Sirena Cisne',
    tagline: 'Efeito alongado',
    description:
      'Preenchimento somente do canto externo ao meio dos olhos, trazendo um efeito alongado e leve.',
    image: sirenaCisne,
    tags: ['Efeito', 'Leve'],
  },
]

export type Review = {
  id: string
  text: string
  author?: string
}

export const reviews: Review[] = [
  {
    id: 'beatriz-carla',
    author: 'Beatriz Carla',
    text: 'Além dela ser uma profissional incrível é muito simpática!',
  },
  {
    id: 'maria-krause',
    author: 'Maria Krause',
    text: 'Fiz com ela e já virei cliente fiel!',
  },
  {
    id: 'leticia-karolyne',
    author: 'Letícia Karolyne',
    text: 'Muito atenciosa e caprichosa, trabalho impecável 💗',
  },
  {
    id: 'durabilidade',
    text: 'Acredita só essa semana que começou a cair, a durabilidade tá muito boa! E todo mundo me elogiou, falaram que ficaram parecendo naturais',
  },
  {
    id: 'autoestima',
    text: 'Mds você arrasa!! Melhorou muuuuito minha autoestima',
  },
  {
    id: 'capricho',
    text: 'Amiga eu amei muito meus cílios, ficaram exatamente do jeitinho que eu queria! Da pra ver o capricho no seu trabalho, ficaram lindos e super naturais já quero fazer de novo',
  },
]

export const restrictions = [
  'Cirurgia recente nos olhos',
  'Tratamento de quimioterapia em andamento',
  'Conjuntivite, blefarite e terçol',
  'Grávidas sem autorização do obstetra',
]

export const policies = {
  maintenance:
    'A manutenção deve ser realizada de 15 a 23 dias. Após o prazo de 24 a 30 dias, o valor é combinado no agendamento.',
  removal: ['Remoção de procedimentos de outros profissionais', 'Remoção dos meus procedimentos'],
}

export const paymentMethods = ['Dinheiro', 'Pix', 'Cartão de crédito', 'Cartão de débito']

export const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#studio', label: 'Studio' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'Dúvidas' },
]
