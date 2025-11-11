export const apiFetch = (path: string, options = {}) => {
  const config = useRuntimeConfig()
  return useFetch(`${config.public.BACKEND_URL}/api${path}`, options)
}
