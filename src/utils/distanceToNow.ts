import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"

export function distanceToNow(date: Date) {
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: enUS
  })

  return formattedDate
}