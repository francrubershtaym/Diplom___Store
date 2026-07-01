interface LoaderProps {
  message?: string
}

export function Loader({ message = 'Загрузка...' }: LoaderProps) {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p className="loader__text">{message}</p>
    </div>
  )
}
