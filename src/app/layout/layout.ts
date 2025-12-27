import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidenav } from '../sidenav/sidenav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Sidenav],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
