import { ExecutorError } from '@qlover/fe-corekit';

type BrainErrorPayload = {
  non_field_errors?: string[];
  detail?: string;
  message?: string;
};

function extractBrainErrorMessage(payload: unknown): string | undefined {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const data = payload as BrainErrorPayload;

  if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
    return data.non_field_errors.join(', ');
  }

  if (typeof data.detail === 'string' && data.detail.trim()) {
    return data.detail;
  }

  if (typeof data.message === 'string' && data.message.trim()) {
    return data.message;
  }

  return undefined;
}

export function throwIfBrainError(
  payload: unknown,
  fallbackId = 'brain_user_error'
): void {
  const message = extractBrainErrorMessage(payload);

  if (message) {
    throw new ExecutorError(fallbackId, message);
  }
}

export function rethrowBrainRequestError(
  error: unknown,
  fallbackId = 'brain_user_error'
): never {
  if (error instanceof ExecutorError) {
    throw error;
  }

  const cause = error instanceof Error ? error.cause : undefined;
  const message =
    extractBrainErrorMessage(cause) ??
    (error instanceof Error ? error.message : undefined) ??
    'Brain user request failed';

  throw new ExecutorError(fallbackId, message);
}
