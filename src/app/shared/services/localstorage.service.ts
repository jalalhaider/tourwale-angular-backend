import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  public setItem(key: string, value: string) {
    localStorage.setItem(this.calculateKey(key), this.encrypt(value))
  }

  public getItem(key: string) {
    const value: any = localStorage.getItem(this.calculateKey(key))
    return this.decrypt(value)
  }

  public removeItem(key: string) {
    localStorage.removeItem(this.calculateKey(key))
  }
  private calculateKey(key: string): string {
    return btoa(key)
  }
  private encrypt(value: string): string {
    return btoa(value)
  }
  private decrypt(value: string): any {
    return atob(value)
  }
}
