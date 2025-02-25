import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
const key = "ABCDEFGHIJKLMNOPQRSTWVXYZabcedfghhRRAL2023_2020_2019-04-19";
@Injectable({
  providedIn: 'root'
})
export class LocalService {

 

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    if(key===''||key===null||key===undefined) return null;
    let data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, key).toString(CryptoJS.enc.Utf8);
  }
}