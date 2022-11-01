import * as React from 'react'

export default function useFetch<Result>(
  fetchUrl: string
): [Result | null, boolean, string | null] {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<null | string>(null)
  const [result, setResult] = React.useState<null | Result>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const jsonData = await fetch(fetchUrl)
        const json = await jsonData.json()
        setIsLoading(false)
        setResult(json)
      } catch (error: any) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [fetchUrl])

  return [result, isLoading, error]
}
