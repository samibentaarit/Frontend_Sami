import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Bus } from '../services/bus';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  buses: Bus[] = [];
  newBus: Bus = {
    num_bus: null,
    marque_bus: '',
    immatriculation_bus: '',
    nb_places: null
  };
  showModal = false; // Variable to control the modal visibility
  constructor(private busService: BusService) { }

  ngOnInit(): void {
    this.getBuses();
  }

  loadBuses() {
    this.busService.getBuses().subscribe(
      (buses) => {
        this.buses = buses;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getBuses(): void {
    this.busService.getBuses().subscribe(buses => {
      this.buses = buses;
    });
  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }


  createBus(): void {
    this.busService.createBus(this.newBus).subscribe(newBus => {
      this.buses.push(newBus);
      this.newBus = {
        num_bus: null,
        marque_bus: '',
        immatriculation_bus: '',
        nb_places: null
      };
    });
  }

  updateBus(bus: Bus): void {
    this.busService.updateBus(bus).subscribe(updatedBus => {
      const index = this.buses.findIndex(b => b.id === updatedBus.id);
      if (index !== -1) {
        this.buses[index] = updatedBus;
      }
    });
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(() => {
      this.buses = this.buses.filter(b => b.id !== id);
    });
  }
}
