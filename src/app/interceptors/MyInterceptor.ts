import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { CacheService } from '../services/cache/cache.service';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

    private retryAttempts = 0; // For retry logic

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authentication headers (if applicable)
        const authToken = this.injector.get(AuthService).getAuthToken();
        if (authToken) {
            req = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
        }

        // Log the request (optional)
        console.log('Request:', req);

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // Handle successful responses
                    console.log('Response:', event);

                    // Cache the response (if applicable)-----------------------------> cache
                    const cacheKey = req.url;
                    this.injector.get(CacheService).set(cacheKey, event, { ttl: 60 }); // Adjust TTL as needed
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // Handle errors
                console.error('Error:', error);

                // Retry the request (if applicable)----------------------------------> retry
                if (error.status === 500 && this.retryAttempts < 3) {
                    this.retryAttempts++;
                    return next.handle(req);
                }

                // Show an error message to the user (if applicable)------------------> toast
                this.injector.get(ToastService).showError(error.message);

                // Throw the error to be handled by other components
                return throwError(error);
            })
        );
    }
}