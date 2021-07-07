import { AxiosPromise } from 'axios'
import Axios, { HttpResponse } from './axios'

// bridge-list

export class BridgeService {
  /**
   * @description get pair list
   * @return {HttpResponse} result
   */
  static pairList(): Promise<HttpResponse<any>> {
    return Axios({
      method: 'get',
      url: '/pair/list',
    })
  }
}
