import { Button } from "@/components/ui/button.tsx";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

interface ApiErrorProps<TData, TError> {
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TData, TError>>;
}

export default function ApiErrorState<TData, TError>({
  refetch,
}: ApiErrorProps<TData, TError>) {
  return (
    <div className={"text-center"}>
      <div>
        <img src="/images/icon-error.svg" alt="error icon" />
      </div>
      <h1>Something went wrong</h1>
      <p>
        We couldn't connect to the server (API error). Please try again in a few
        moments
      </p>
      <Button onClick={() => refetch()} variant="outline">
        Try Again
      </Button>
    </div>
  );
}