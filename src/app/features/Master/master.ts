import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master.html',
  styleUrls: ['./master.scss']
})
export class MasterPageComponent {
  constructor(private router: Router) {}
 
}