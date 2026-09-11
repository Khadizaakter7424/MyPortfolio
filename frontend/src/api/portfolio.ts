import { PortfolioData } from "../types";

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const response = await fetch("/api/portfolio");
  if (!response.ok) {
    throw new Error(`Failed to load portfolio data (${response.status})`);
  }
  return response.json();
}
