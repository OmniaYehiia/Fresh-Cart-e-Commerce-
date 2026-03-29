import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let platformid = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformid)) {
    if (localStorage.getItem('token') != undefined) {
      return true;
    } else {
      return router.parseUrl('/login');
    }
  } else {
    return true;
  }
};
