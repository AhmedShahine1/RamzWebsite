export interface Notification {
    id: number
    userId: number
    isActive: boolean
    uuid: string
    fcmtoken: string
    title: string
    message: string
    createdDate: string
  }
  