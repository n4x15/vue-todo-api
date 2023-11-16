export type UpdateTaskInput = {
  text?: string
  subTaskIds?: string[]
  isCompleted?: boolean
  order?: number
  completedAt?: Date
  comment?: string
}
