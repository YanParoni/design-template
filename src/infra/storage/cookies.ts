import { injectable } from 'inversify'
import Cookies from 'js-cookie'
import { IStorage, StorageKeys } from './contracts/storage'

const ONE_DAY = 60 * 60 * 24

@injectable()
export class CookiesStorage implements IStorage {
  private readonly cookies: typeof Cookies = Cookies

  set(key: StorageKeys, value: string, expires: number = ONE_DAY, path: string = '/'): void {
        this.cookies.set(key, value, { expires, path })
  }

  get (key: StorageKeys): string {
    return this.cookies.get()[key]
  }

  delete (key: StorageKeys): void {
    this.cookies.remove(key)
  }
}
