import { Category, Paginated, Question } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error("error fetching from api", url, e);
      return null;
    }

    if (!response.ok) {
      console.error("non 2xx status from API", url);
      return null;
    }

    if (response.status === 404) {
      console.error("404 from API", url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error("error parsing json", url, e);
      return null;
    }

    return json as T;
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;

    const response = await this.fetchFromApi<Category | null>(url);

    return response;
  }

  async getCategories(): Promise<Paginated<Category> | null> {
    const url = BASE_URL + "/categories";

    const response = await this.fetchFromApi<Paginated<Category>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getQuestions(
    categorySlug: string,
  ): Promise<Paginated<Question> | null> {
    const url = BASE_URL + `/questions?category=${categorySlug}`;
    // new URL()

    const response = await this.fetchFromApi<Paginated<Question>>(url);

    return response;
  }

  async createCategory(title: string): Promise<Category | string> {
    const url = BASE_URL + `/categories`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: title }),
      });

      if (!response.ok) {
        console.error("non 2xx status from API", url);
        return `${response.status} something went wrong`;
      }

      const json = await response.json();
      return json as Category;
    } catch (e) {
      console.error("error creating category", url, e);
      return (e as Error).message;
    }
  }

  async updateCategory(
    slug: string,
    title: string,
  ): Promise<Category | string> {
    const url = BASE_URL + `/categories/${slug}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: title }),
      });

      if (!response.ok) {
        console.error("non 2xx status from API", url);
        return `${response.status} something went wrong`;
      }

      const json = await response.json();
      return json as Category;
    } catch (e) {
      console.error("error updating category", url, e);
      return (e as Error).message;
    }
  }

  async deleteCategory(
    slug: string,
  ): Promise<{ success: boolean; err?: string }> {
    const url = BASE_URL + `/categories/${slug}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("non 2xx status from API", url);
        return {
          success: false,
          err: `${response.status} something went wrong`,
        };
      }

      return { success: true };
    } catch (e) {
      console.error("error deleting category", url, e);
      return { success: false, err: (e as Error).message };
    }
  }
}