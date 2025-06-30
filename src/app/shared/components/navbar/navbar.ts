import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
    constructor(private router:Router){}

    ngOnInit(): void {}

//   onSearch(query: string) {
//   const trimmed = query.trim();
//   if (trimmed.length > 0) {
//     this.router.navigate(['/search', trimmed]);
//   }
//   else {
//     this.router.navigate(['/']);
//   }
// }
}
