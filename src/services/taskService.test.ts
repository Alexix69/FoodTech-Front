import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Station, TaskStatus } from '../models/Task'
import type { Task } from '../models/Task'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

vi.mock('./apiClient', () => ({
  apiClient: {
    patch: vi.fn(),
  },
}))

describe('taskService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('completeTask', () => {
    it('debe llamar PATCH /api/tasks/{id}/complete y retornar la tarea', async () => {
      const mockTask: Task = {
        id: 5,
        orderId: 10,
        tableNumber: 'A1',
        station: Station.HOT_KITCHEN,
        status: TaskStatus.COMPLETED,
        products: [],
        createdAt: new Date().toISOString(),
      }

      const { apiClient } = await import('./apiClient')
      vi.mocked(apiClient.patch).mockResolvedValue(mockTask)

      const { taskService } = await import('./taskService')
      const result = await taskService.completeTask(5)

      expect(apiClient.patch).toHaveBeenCalledWith('/api/tasks/5/complete')
      expect(result).toEqual(mockTask)
    })
  })
})
