import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import md5 from "md5";

export default class StoreService {
	static _appId = process.env.BUSINESS_RU_APP_ID;
	static _secret = process.env.BUSINESS_RU_SECRET;
	static _address = process.env.BUSINESS_RU_ADDRESS;

    static async appPsw(params = {}) {
		try {
		  const _token = await this.getToken();
		  const { _appId, _secret } = this;
		  const newParams = { app_id: _appId, ...params };
		  const orderedParams = Object.keys(newParams).sort().reduce(
			(obj, key) => {
				obj[key] = newParams[key];
				return obj;
			}, {});
		  const paramsString = new URLSearchParams(orderedParams).toString();
		  const appPsw = md5(`${_token + _secret + paramsString}`);
		  return appPsw;
		} catch (e) {
		  console.log(e.message);
		}
	}

	static async getToken() {
		try {
			const params = {
				app_id: this._appId,
				app_psw: md5(`${this._secret}app_id=${this._appId}`),
			};
			const response = await axios.get(
				`${this._address}/api/rest/repair.json`,
				{ params }
			);
			this._token = response.data.token;
			return response.data.token;
		} catch (e) {
		    console.log(e.message);
		}
	}

	static async request(method, model, params = {}, body = {}) {
		try {
			const appId = this._appId;
			const address = this._address;
			const appPsw = await this.appPsw(params);
			const url = `${address}/api/rest/${model}.json`;
			const nativeParams = {
				app_id: appId,
				app_psw: appPsw,
			};
			let res;
			if (method === "get") {
				res = await axios.get(url, { params: { ...nativeParams, ...params }, body });
			} else if (method === "post") {
				res = await axios.post(url, body, { params: { ...nativeParams, ...params } });
			} else if (method === "put") {
				res = await axios.put(url, body, { params: { ...nativeParams, ...params } });
			}
			return res.data;
		} catch (e) {
		  console.log(e.message);
		}
	}

	static async getProducts() {
    try {
      const res = await this.request("get", "goods", {
        with_attributes: 1,
        with_prices: 1,
      });

      return res.result;
    } catch (e) {
      console.log(e.message);
    }
  }
}