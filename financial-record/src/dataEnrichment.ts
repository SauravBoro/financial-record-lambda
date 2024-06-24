import axios from "axios";
export const enrichData = async(data: any) => {
    const user_indicators = await axios.get(`https://api.api-ninjas.com/v1/country?name=${data.userDetails.billingAddress.country}`,{
        'headers' : {
            'X-Api-Key': 'ULNfoK1EDNdILasddMfSyA==dtGHBtgKCWd7ziLd',
        }
    });
    const merchant_indicators = await axios.get(`https://api.api-ninjas.com/v1/country?name=${data.transactionDetails.merchantDetails.countryCode}`,{
        'headers' : {
            'X-Api-Key': 'ULNfoK1EDNdILasddMfSyA==dtGHBtgKCWd7ziLd',
        }
    });
    const currencyRates = await axios.get(`https://api.exchangerate-api.com/v4/latest/${data.transactionDetails.currency}`);
    return {
    ...data,
    regionalIndicators : merchant_indicators.data[0],
    exchangeRate: currencyRates.data.rates[user_indicators.data[0].currency.code],
    };
};
  