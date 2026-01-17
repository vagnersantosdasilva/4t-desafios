import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Toast } from "../models/toast.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private counter = 0;

  show(message: string, type: Toast['type'], delay = 4000) {
    const toast: Toast = {
      id: ++this.counter,
      message,
      type,
      delay
    };

    const toasts = [...this.toastsSubject.value, toast];
    this.toastsSubject.next(toasts);

    setTimeout(() => this.remove(toast.id), delay);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  error(message: string) {
    this.show(message, 'error', 6000);
  }

  remove(id: number) {
    this.toastsSubject.next(
      this.toastsSubject.value.filter(t => t.id !== id)
    );
  }
}
