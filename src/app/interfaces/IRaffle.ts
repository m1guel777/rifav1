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
  oportunities: boolean;
}

export interface Ticket {
  tk_key:         number;
  number_tk:      string;
  status_cst_key: number;
  paid_at:        null;
  reserved_at:    null;
  client_cli_key: null;
  raffle_key_fk:  number;
  opportunities:  string;
}
