import { HttpHeaders, HttpParams } from '@angular/common/http';

const clientEncrypted = btoa('biblioteca:biblioteca@123');

export const CLIENT_HEADER = new HttpHeaders({
  Authorization: `Basic ${clientEncrypted}`,
  'Content-Type': 'application/x-www-form-urlencoded',
});

export const PARAMS_REFRESH_TOKEN = new HttpParams().set('grant_type', 'refresh_token')
