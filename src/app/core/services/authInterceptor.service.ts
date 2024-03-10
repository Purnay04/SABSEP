import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if(token) {
      // req = req.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // });
    }
    return next.handle(req);
  }
}