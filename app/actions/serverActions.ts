"use server";

export async function analyzeUrl(url: string) {
    const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });

    return response.json();
}