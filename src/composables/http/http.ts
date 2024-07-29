import type { AxiosError, AxiosRequestConfig } from 'axios'
import {
  type UseQueryOptions,
  type UseMutationOptions,
  useQuery,
  useMutation
} from '@tanstack/vue-query'
import type { ComputedRef, Ref } from 'vue'
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    Object.assign(config, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = 'admin/auth/login'
    }
    return Promise.reject(error)
  }
)

type Config<TData = any, TError = any> = {
  keys?: any[]
  params?: Ref
  httpOptions?: AxiosRequestConfig
  queryOptions?: UseQueryOptions<TData, TError>
}

/**
 * API GET Method request only.
 * @example
    const { data: items, isLoading, isError } = useHttp<number, string>('/', {
      keys: ['id']
      queryOptions: {
        onSuccess: function (data) {
          return
        },
        onError: function (data) {
          data
        },
      },
    })
 * @param url URL API
 * @param options HTTP Mutation Options
 */
export function useHttp<TData = any, TError = any>(
  url: ComputedRef<string> | string,
  options?: Config<TData, TError>
) {
  return useQuery({
    queryKey: [url, options?.params],
    queryFn: async () => {
      try {
        const { data } = await http.get<TData>(unref(url), {
          ...options?.httpOptions,
          params: unref(options?.params)
        })
        return data
      } catch (e: any) {
        Promise.reject(e?.response ?? e)
      }
    }
  })
}

type HttpMutationOptions<TData = any, TError = any, TVariables = any, TContext = any> = {
  method: 'GET' | 'HEAD' | 'POST' | 'OPTIONS' | 'PUT' | 'DELETE' | 'PATCH'
  httpOptions?: AxiosRequestConfig
  queryOptions?: UseMutationOptions<TData, TError, TVariables, TContext>
}

/**
 * Update data to the server.
 * @example
  const {mutate, isLoading, isError, error} =  useHttpMutation<TData, TError>('todos/:id', {
    method: 'POST',
    httpOptions: { // axios options
      timeout: 30000,
    },
    queryOptions: { // vue-query options
      onSuccess: function (data) {
        console.log(data);
      },
      onError: function (data) {
        console.log(data);
      },
    },
    })
    const onSubmitForm = (data) => {
      mutate(data)
    }
 * @param url URL API
 * @param options HTTP Mutation Options
 */
export function useHttpMutation<TVariables = any, TData = any, TError = any>(
  url: Ref | string,
  options: HttpMutationOptions<TData, TError, TVariables>
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (value) => {
      return new Promise<TData>((resolve, reject) => {
        return http
          .request<TData>({
            url: unref(url),
            method: options.method,
            ...options.httpOptions,
            data: value
          })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error: AxiosError<TError>) => {
            reject(error.response ?? error.message)
          })
      })
    },
    ...options.queryOptions
  })
}
