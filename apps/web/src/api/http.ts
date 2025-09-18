export async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await res.json()) as any;
      if (data) {
        if (Array.isArray(data.message)) return data.message.join(', ');
        if (typeof data.message === 'string' && data.message) return data.message;
        if (typeof data.error === 'string' && data.error) return data.error;
        if (typeof data.detail === 'string' && data.detail) return data.detail;
      }
    } else {
      const text = await res.text();
      if (text) return text;
    }
  } catch {
    // ignore parse errors
  }
  return `Request failed (${res.status} ${res.statusText})`;
}

export async function throwIfNotOk(res: Response): Promise<void> {
  if (!res.ok) {
    const message = await parseErrorMessage(res);
    throw new Error(message);
  }
}





