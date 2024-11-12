import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtiquetasService } from '../../services/etiquetas.service';
import { FormsModule } from '@angular/forms';
import { IEtiquetas } from '../../models/etiquetas.model';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.css'],
  standalone: true,  // Esto convierte el componente en independiente
  imports: [CommonModule, FormsModule]  // Importar CommonModule y FormsModule

})
export class EtiquetasComponent implements OnInit {
  etiquetas: IEtiquetas[] = [];
  newEtiqueta: string = '';  // Nombre de la nueva etiqueta
  newPrice: number = 0;  // Precio de la nueva etiqueta
  page: number = 1;  // Página actual
  limit: number = 5; // Elementos por página
  totalPages: number = 1;  // Número total de páginas
  totalEtiquetas: number = 0;  // Total de etiquetas

  constructor(private etiquetasService: EtiquetasService) {}

  ngOnInit(): void {
    // Llamar al servicio para obtener las etiquetas al iniciar
    this.getEtiquetas();
  }

  // Método para obtener las etiquetas desde el backend con paginación
  getEtiquetas(): void {
    this.etiquetasService.getEtiquetas(this.page, this.limit).subscribe(
      (data) => {
        this.etiquetas = data.etiquetas;  // Asignar las etiquetas obtenidas
        this.totalPages = data.totalPages;  // Asignar el total de páginas
        this.totalEtiquetas = data.totalEtiquetas;  // Asignar el total de etiquetas
        console.log('Etiquetas obtenidas:', this.etiquetas);
      },
      (error) => {
        console.error('Error al obtener las etiquetas', error);
      }
    );
  }

  // Método para crear una nueva etiqueta con precio
  createEtiqueta(): void {
    const newEtiquetaData = {
      name: this.newEtiqueta,
      price: this.newPrice,  // El precio en lugar de description
    };

    this.etiquetasService.createEtiqueta(newEtiquetaData).subscribe((data) => {
      this.getEtiquetas();  // Recargar las etiquetas después de crear una nueva
      this.newEtiqueta = '';
      this.newPrice = 0;
    });
  }

  // Método para eliminar una etiqueta
  deleteEtiqueta(id: string | undefined): void {
    if (id) {
      this.etiquetasService.deleteEtiqueta(id).subscribe(() => {
        this.getEtiquetas();  // Recargar las etiquetas después de eliminar
      });
    }
  }

  // Método para ir a la siguiente página
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.getEtiquetas();
    }
  }

  // Método para ir a la página anterior
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getEtiquetas();
    }
  }
}