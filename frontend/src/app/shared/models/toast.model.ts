export type ToastType = 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  delay?: number;
}
