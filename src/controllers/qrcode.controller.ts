import {
  post,
  requestBody,
  response
} from '@loopback/rest';

import QRCode from 'qrcode';
import {BankKey, BanksObject, QRPay} from 'vietnam-qr-pay';
interface QrPayRequest {
  bankKey: string;
  bankNumber: string;
  amount: string;
  description: string;
}
export class QrcodeController {
  constructor() {}

  // Map to `GET /ping`
  @post('/qrcode/bank')
  @response(200, {

  })
  async bank(@requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            bankKey: {
              type: 'string'
            },
            bankNumber: {
              type: 'string'
            },
            amount: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        }
      }
    }
  }) request: QrPayRequest): Promise<object> {
    const { bankKey, bankNumber, amount, description } = request;
    const qrPay = QRPay.initVietQR({
      bankBin: BanksObject[bankKey as BankKey].bin,
      bankNumber: bankNumber,
      amount: amount,
      purpose: description
    })

    const context = qrPay.build();
    const img = await QRCode.toDataURL(context);
    return {
      result: img
    };
  }
}
