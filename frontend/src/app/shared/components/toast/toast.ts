import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  public toastService = inject(ToastService);
}
