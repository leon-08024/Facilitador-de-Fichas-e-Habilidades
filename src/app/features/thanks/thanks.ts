import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-thanks',
  imports: [],
  templateUrl: './thanks.html',
  styleUrl: './thanks.scss'
})
export class ThanksPageComponent {
    constructor(private router: Router) {}

    voltarAoInicio(): void {
      this.router.navigate(['/home'])
    }
    custom(): void {
      this.router.navigate(['/custom'])
    }
}
