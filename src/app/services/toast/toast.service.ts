// toast.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showSuccess(message: string): void {
    console.log(`✅ Success: ${message}`); // Replace with actual UI toast logic
  }

  showError(message: string): void {
    console.error(`❌ Error: ${message}`); // Replace with actual UI toast logic
  }

  showInfo(message: string): void {
    console.log(`ℹ️ Info: ${message}`); // Replace with actual UI toast logic
  }
}
