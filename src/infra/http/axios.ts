import axios from 'axios'
import { injectable } from 'inversify'
import { HttpClientDTO, IHttpClient } from './contracts'
import 'reflect-metadata'

const RAWG_KEY = process.env.RAWG_API_KEY

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'token': `Token ${RAWG_KEY}`
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async thrower (callback: Function) {
    try {
      return (await callback())
    } catch (error: any) {
     console.log(error)
    }
  }

  async get ({ url, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const fullParams = { ...params, key: RAWG_KEY };
    const result = await this.axiosInstance.get(url, {
        headers,
        params: fullParams
      });
    return result.data;
  }

  async post ({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await axios.request({
        url,
        data,
        headers,
        params,
        method: 'post'
      })
    })
    return result.data
  }

  async put ({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await axios.request({
        url,
        data,
        headers,
        params,
        method: 'put'
      })
    })
    return result.data
  }

  async patch ({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await axios.request({
        url,
        data,
        headers,
        params,
        method: 'patch'
      })
    })
    return result.data
  }

  async delete ({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await axios.request({
        url,
        data,
        headers,
        params,
        method: 'delete'
      })
    })
    return result.data
  }
}
