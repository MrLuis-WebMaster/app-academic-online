export class APIClient {
    private static instance: APIClient

    private constructor() { }

    static getInstance(): APIClient {
        if (!APIClient.instance) {
            APIClient.instance = new APIClient()
        }
        return APIClient.instance
    }

    private buildUrl(endpoint: string): string {
        return `/api${endpoint}`
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

        const res = await fetch(this.buildUrl(endpoint), {
            ...options,
            headers: {
                ...(options.headers || {}),
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        })

        if (!res.ok) {
            const errorBody = await res.text()
            throw new Error(`HTTP ${res.status}: ${errorBody}`)
        }

        return res.json()
    }

    get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "GET" })
    }

    post<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        })
    }

    put<T>(endpoint: string, body: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        })
    }

    delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" })
    }
}

export const apiClient = APIClient.getInstance()