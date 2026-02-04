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
    <div className={"text-center min-h-screen w-full flex flex-col gap-4 mt-8 lg:mt-10 xl:mt-12 md:max-w-130 lg:max-w-150"}>
      <div className={"w-full"}>
        <img
          src="/images/icon-error.svg"
          alt="error icon"
          className={"mx-auto size-8"}
        />
      </div>
      <h1 className={"text-neutral-0 text-3xl lg:text-4xl xl:text-5xl font-extrabold"}>Something went wrong</h1>
      <p className={"text-xl font-semibold"}>
        We couldn't connect to the server (API error). Please try again in a few
        moments
      </p>
      <Button className={"max-w-25 bg-neutral-600 border-none cursor-pointer mx-auto p-5"}  onClick={() => refetch()} variant="outline">
        <img src="/images/icon-retry.svg" alt={"retry icon"}/>
        Retry
      </Button>
    </div>
  );
}