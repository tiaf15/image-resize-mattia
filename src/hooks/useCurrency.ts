import { useState, useEffect } from "react";

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

const CURRENCIES: Record<string, CurrencyInfo> = {
  US: { code: "USD", symbol: "$", rate: 1.08 },
  GB: { code: "GBP", symbol: "£", rate: 0.86 },
  AU: { code: "AUD", symbol: "A$", rate: 1.65 },
  CA: { code: "CAD", symbol: "C$", rate: 1.47 },
  NZ: { code: "NZD", symbol: "NZ$", rate: 1.78 },
  EU: { code: "EUR", symbol: "€", rate: 1 },
};

const EU_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", 
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", 
  "SI", "ES", "SE"
];

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyInfo>(CURRENCIES.EU);
  const [isEU, setIsEU] = useState(false);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Try to get country from timezone first (no API call needed)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let countryCode = "EU";

        // Common timezone to country mappings
        if (timezone.startsWith("America/New_York") || timezone.startsWith("America/Chicago") || 
            timezone.startsWith("America/Denver") || timezone.startsWith("America/Los_Angeles") ||
            timezone.startsWith("America/Phoenix") || timezone.startsWith("US/")) {
          countryCode = "US";
        } else if (timezone.startsWith("Europe/London") || timezone === "GB") {
          countryCode = "GB";
        } else if (timezone.startsWith("Australia/")) {
          countryCode = "AU";
        } else if (timezone.startsWith("America/Toronto") || timezone.startsWith("America/Vancouver") ||
                   timezone.startsWith("Canada/")) {
          countryCode = "CA";
        } else if (timezone.startsWith("Pacific/Auckland")) {
          countryCode = "NZ";
        } else if (timezone.startsWith("Europe/")) {
          countryCode = "EU";
        }

        // Fallback: try IP-based geolocation
        if (countryCode === "EU") {
          try {
            const response = await fetch("https://ipapi.co/json/", { 
              signal: AbortSignal.timeout(3000) 
            });
            if (response.ok) {
              const data = await response.json();
              countryCode = data.country_code || "EU";
            }
          } catch {
            // Keep default EU if API fails
          }
        }

        // Check if EU country
        const isEUCountry = EU_COUNTRIES.includes(countryCode);
        setIsEU(isEUCountry);

        // Set currency based on country
        if (CURRENCIES[countryCode]) {
          setCurrency(CURRENCIES[countryCode]);
        } else if (isEUCountry) {
          setCurrency(CURRENCIES.EU);
        } else {
          setCurrency(CURRENCIES.US); // Default to USD for unknown countries
        }
      } catch {
        // Default to EUR on any error
        setCurrency(CURRENCIES.EU);
      }
    };

    detectCurrency();
  }, []);

  const formatPrice = (euroPrice: number): string => {
    const convertedPrice = Math.round(euroPrice * currency.rate);
    return `${currency.symbol}${convertedPrice}`;
  };

  return { currency, isEU, formatPrice };
}
