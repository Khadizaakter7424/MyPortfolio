import { PortfolioData } from "../types";
import { API_BASE_URL } from "./config";

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio`);
  if (!response.ok) {
    throw new Error(`Failed to load portfolio data (${response.status})`);
  }
  return response.json();
}
