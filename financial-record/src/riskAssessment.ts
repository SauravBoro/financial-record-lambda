export const assessRisk = async(data: any) => {
    //normalizing indicators
    const norm_rate = Math.max(0, Math.min(10, (data.exchangeRate/100)* 10)) * 0.25;
    const norm_growth = Math.max(0, Math.min(10, 10 - (data.regionalIndicators.gdp_growth*2))) * 0.25;
    const norm_amount = Math.max(0, Math.min(10, (data.transactionDetails.amount/1000)*10)) * 0.25;
    const norm_gdp = Math.max(0, Math.min(10, 10 - (data.regionalIndicators.gdp_per_capita - 1000)/4900)) * 0.25;
    return norm_amount + norm_rate + norm_gdp + norm_growth;
};