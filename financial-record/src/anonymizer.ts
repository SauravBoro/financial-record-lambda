import { createHash } from "crypto";

function hashData(data: string): string {
    return createHash('sha256').update(data).digest('hex');
}

export const anonymizeData = (data: any) => {
    return {
        ...data,
        firstName: hashData(data.firstName),
        lastName: hashData(data.lastName),
        email: hashData(data.email),
        phone: hashData(data.phone),
      };
  };
  