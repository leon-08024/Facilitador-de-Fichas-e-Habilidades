import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './core/menu';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    HttpClient
  ]
})
export class App {
  protected readonly title = signal('EcomerceSkateArtesanal');
}
