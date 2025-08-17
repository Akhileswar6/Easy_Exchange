"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/ui/multi-select";
import { currencies, Currency } from "@/lib/currencies";
import { ArrowRightLeft, Star, Loader2 } from "lucide-react";

interface ConversionResult {
  to: string;
  from: string;
  amount: number;
  result: number;
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrencies, setToCurrencies] = useState<string[]>(["EUR", "JPY"]);
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currencyOptions = useMemo(() => {
    return currencies.map((c) => ({ value: c.code, label: `${c.code} - ${c.name}` }));
  }, []);

  const handleSwapCurrencies = () => {
    if (toCurrencies.length > 0) {
      const newFrom = toCurrencies[0];
      const newTo = [fromCurrency, ...toCurrencies.slice(1)];
      setFromCurrency(newFrom);
      setToCurrencies(newTo);
    }
  };

  const handleConvert = useCallback(() => {
    setIsLoading(true);
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !fromCurrency || toCurrencies.length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Mock API call
    setTimeout(() => {
      const newResults = toCurrencies.map((to) => {
        // Mock conversion rate
        const rate = Math.random() * 2 + 0.5;
        return {
          to,
          from: fromCurrency,
          amount: parsedAmount,
          result: parsedAmount * rate,
        };
      });
      setResults(newResults);
      setIsLoading(false);
    }, 500);
  }, [amount, fromCurrency, toCurrencies]);

  const getCurrencyName = (code: string) => {
    return currencies.find(c => c.code === code)?.name || code;
  }

  return (
  <Card className="w-full shadow-lg transition-all duration-300 border border-gray-300 dark:border-gray-800 bg-white dark:bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-medium tracking-tight">
          Currency Converter
        </CardTitle>
        <CardDescription>
          Convert one amount into multiple currencies at once.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              className="text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from" className="text-base">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency: Currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-center my-2">
            <Button variant="ghost" size="icon" onClick={handleSwapCurrencies} aria-label="Swap currencies">
                <ArrowRightLeft className="h-5 w-5 text-muted-foreground transition-transform duration-300 hover:rotate-180" />
            </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <MultiSelect
            options={currencyOptions}
            selected={toCurrencies}
            onChange={setToCurrencies}
            placeholder="Select currencies..."
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={handleConvert} className="flex-1 text-lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Convert
          </Button>
        </div>

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Conversion Results</h3>
            <Separator />
            <div className="space-y-4 pt-4">
              {results.map((res, index) => (
                <div key={index} className="p-6 bg-muted/50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-lg ${res.to === 'EUR' || res.to === 'JPY' ? 'font-normal' : 'font-medium'}`}>{res.result.toFixed(2)} {res.to}</p>
                      <p className="text-sm text-muted-foreground">{getCurrencyName(res.to)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">1 {res.from} = {(res.result/res.amount).toFixed(4)} {res.to}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
