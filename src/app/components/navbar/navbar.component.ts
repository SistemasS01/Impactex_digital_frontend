import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar', // Este selector ya es correcto
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  public menuAbierto = false;

  public toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  public abrirMenu(): void {
    this.menuAbierto = true;
  }

  public cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
