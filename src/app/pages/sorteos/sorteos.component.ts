import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IApiResponseDto } from 'src/app/interfaces/IApiResponseDTO';
import { Raffle, RaffleImages } from 'src/app/interfaces/IRaffle';
import { BoletosService } from 'src/app/services/boletos.service';
import { Ticket } from '../../interfaces/IRaffle';


@Component({
  selector: 'app-sorteos',
  templateUrl: './sorteos.component.html',
  styleUrls: ['./sorteos.component.scss']
})
export class SorteosComponent implements OnInit{

  public data1 : any;
  baseUrl: string = 'http://192.168.1.98:8082/imagenes/';
  imagenes: RaffleImages[] = [];
  imagenActualIndex: number = 0;
  public ticketNumber: string = '';
  public isSearchTicket = false;

  lstTickets : Ticket[] = [];
  public lstTicketsToApart : Ticket[] = [];

  raffle: Raffle = {
    raffle_key: null,
    active: false,
    created_at: '',
    raffle: '',
    description: '',
    raffles_types_fk: 0,
    price_per_ticket: 0
  }

  ticket: Ticket | undefined = undefined;

  customOptions = {
    loop: true,           // Permite que el carrusel se repita
    autoplay: true,       // Activa el desplazamiento automático
    autoplayTimeout: 5000, // Intervalo entre cada imagen (3 segundos)
    autoplayHoverPause: true, // Pausa el desplazamiento cuando el ratón está sobre el carrusel
    dots: true,           // Muestra los puntos de navegación
    nav: false,           // Desactiva las flechas de navegación
    items: 1,             // Muestra solo una imagen a la vez
    margin: 0,            // Sin margen entre las imágenes
    stagePadding: 0,      // Sin relleno adicional
    responsive: {         // En dispositivos pequeños también muestra 1 imagen
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  };


  //modal
  mostrarModal: boolean = false;
  cantidades = [1, 2, 3, 5, 10];
  cantidadSeleccionada = 1;
  boletosGenerados: string[] = [];


  constructor(private  serv: BoletosService,
        private route: ActivatedRoute,
        private router: Router
      ){

      }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID del sorteo recibido:', id);

    // Verificar si id es null y convertirlo a número si no lo es
    if (id) {
      const numericId = +id; // Convierte el string 'id' a número
      this.getTicketsRaffleByid(numericId); // Llama al método pasándole el id numérico
    } else {
      console.log('ID no válido');
    }


  }



      async getTicketsRaffleByid(id: number){

        this.serv.getTicketsRaffleByid(id).subscribe({
          next: (rs: IApiResponseDto) => {

            if (!rs.error) {
              console.log("getTicketsRaffleByid:" , rs);
              this.lstTickets = rs.data;


              this.getSorteosImgs(id);
            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }

      salir(): void {
        this.router.navigate(['']);
      }


      async getSorteosImgs(id: number){

        this.serv.getSorteosImgs(id).subscribe({
          next: (rs: IApiResponseDto) => {

            if (!rs.error) {
              console.log("imgs de sorteos:" , rs);

              this.imagenes = rs.data;
              this.getSorteosByid(id);

            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }


      async getSorteosByid(id: number){

        this.serv.getSorteosByid(id).subscribe({
          next: (rs: IApiResponseDto) => {

            if (!rs.error) {
              this.raffle = rs.data[0];
              console.log("el sorteo es getSorteosByid :" , this.raffle);
            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }

      onInputChange(event: any) {
        const value = event.target.value;
        // Reemplaza todo lo que no sea número
        this.ticketNumber = value.replace(/[^0-9]/g, '');


        this.ticket = this.lstTickets.find(t => t.number_tk === this.ticketNumber);

        if (this.ticket) {
          console.log('Boleto encontrado:', this.ticket);
          this.isSearchTicket=true;
          // Aquí puedes redirigir, mostrar info, etc.
        } else {
          this.isSearchTicket=false;
          // Puedes mostrar un mensaje al usuario
        }


      }

      // Bloquear letras al presionar teclas
      onlyNumberKey(event: KeyboardEvent): boolean {
        const charCode = event.which ? event.which : event.keyCode;

        // Permitir solo números (charCode entre 48 y 57 son dígitos del 0 al 9)
        if (charCode < 48 || charCode > 57) {
          event.preventDefault();
          return false;
        }

        return true;
      }

      addTicketToLstToApart(){
        if (this.ticket && this.ticket.status_cst_key!=4)  {
          this.lstTicketsToApart.push(this.ticket);
          this.ticket.status_cst_key=4;
          this.ticket = undefined;
          this.isSearchTicket=false;
          this.ticketNumber='';
        }

        this.ticket = undefined;
          this.isSearchTicket=false;
          this.ticketNumber='';

      }

      toggleSelect(boleto: Ticket) {
        if(boleto.status_cst_key!=4){
          this.lstTicketsToApart.push(boleto);
          boleto.status_cst_key=4;

        }

      }

      removeFromApart(boleto: Ticket) {
        this.lstTicketsToApart = this.lstTicketsToApart.filter(t => t.number_tk !== boleto.number_tk);
        boleto.status_cst_key=1;
      }

      //modal
      abrirMaquinita() {
        this.mostrarModal = true;
        this.boletosGenerados = [];
      }

      cerrarMaquinita() {
        this.mostrarModal = false;
      }

      generarBoletos() {
        // const disponibles = [...this.boletosDisponibles];
        // this.boletosGenerados = [];

        // for (let i = 0; i < this.cantidadSeleccionada; i++) {
        //   if (disponibles.length === 0) break;
        //   const index = Math.floor(Math.random() * disponibles.length);
        //   const boleto = disponibles.splice(index, 1)[0];
        //   this.boletosGenerados.push(boleto);
        // }
      }

      girar() {
        // Obtener los elementos de los números con la aserción de tipo
        const numero1 = document.getElementById('numero1') as HTMLElement;
        const numero2 = document.getElementById('numero2') as HTMLElement;
        const numero3 = document.getElementById('numero3') as HTMLElement;

        // Iniciar animación para el giro de los números
        numero1.style.transform = 'rotateX(360deg)';
        numero2.style.transform = 'rotateX(360deg)';
        numero3.style.transform = 'rotateX(360deg)';

        // Después de la animación (0.5s), actualizamos los números
        setTimeout(() => {
          // Siempre mostrar el número 7
          numero1.textContent = '7';
          numero2.textContent = '7';
          numero3.textContent = '7';

          // Reiniciar animación
          numero1.style.transform = 'rotateX(0deg)';
          numero2.style.transform = 'rotateX(0deg)';
          numero3.style.transform = 'rotateX(0deg)';
        }, 500); // 500 ms es el tiempo de la animación
      }

      // Definir la función generarNumero() (ya no es necesaria)
      generarNumero(): number {
        return 7;  // Siempre retorna el número 7
      }


      isClicked = false;

  activarEfecto() {
    this.isClicked = true;

    // Quita el efecto después de un tiempo para permitir volver a hacerlo
    setTimeout(() => {
      this.isClicked = false;
    }, 1500); // un poco más que el tiempo de animación (0.5s)
  }

}
