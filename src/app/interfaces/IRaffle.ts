export interface RaffleImages {
  id_image: number;
  raffle: number;
  img_name: string;
  creation_date: string;
}


export interface Raffle {
  raffle_key:       null;
  active:           boolean;
  created_at:       string;
  raffle:           string;
  description:      string;
  raffles_types_fk: number;
  price_per_ticket: number;
}
