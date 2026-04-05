import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Station, TaskStatus } from '../models/Task'
import type { Task } from '../models/Task'

vi.mock('../services/taskService', () => ({
  taskService: {
    getTasksByStation: vi.fn(),
    completeTask: vi.fn(),
  },
}))

const makeTask = (id: number, status: TaskStatus, createdAt: string): Task => ({
  id,
  orderId: id,
  tableNumber: `T${id}`,
  station: Station.HOT_KITCHEN,
  status,
  products: [],
  createdAt,
})

describe('useStationTasks', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('debe ordenar tareas PENDING por createdAt ascendente (FIFO)', async () => {
    const older = makeTask(1, TaskStatus.PENDING, '2026-01-01T10:00:00')
    const newer = makeTask(2, TaskStatus.PENDING, '2026-01-01T12:00:00')

    const { taskService } = await import('../services/taskService')
    vi.mocked(taskService.getTasksByStation).mockResolvedValue([newer, older])

    const { useStationTasks } = await import('./useStationTasks')
    const { result } = renderHook(() => useStationTasks(Station.HOT_KITCHEN, 0))

    await act(async () => {
      await result.current.refreshTasks()
    })

    expect(result.current.pendingTasks[0].id).toBe(1)
    expect(result.current.pendingTasks[1].id).toBe(2)
  })

  it('debe llamar taskService.completeTask y refrescar tras completeTask', async () => {
    const task = makeTask(5, TaskStatus.IN_PREPARATION, '2026-01-01T10:00:00')

    const { taskService } = await import('../services/taskService')
    vi.mocked(taskService.getTasksByStation).mockResolvedValue([task])
    vi.mocked(taskService.completeTask).mockResolvedValue({ ...task, status: TaskStatus.COMPLETED })

    const { useStationTasks } = await import('./useStationTasks')
    const { result } = renderHook(() => useStationTasks(Station.HOT_KITCHEN, 0))

    await act(async () => {
      await result.current.refreshTasks()
    })

    await act(async () => {
      await result.current.completeTask(5)
    })

    expect(taskService.completeTask).toHaveBeenCalledWith(5)
    expect(taskService.getTasksByStation).toHaveBeenCalledTimes(3)
  })

  it('no debe exponer opcion ALL ni taskCounts con all', async () => {
    const { taskService } = await import('../services/taskService')
    vi.mocked(taskService.getTasksByStation).mockResolvedValue([])

    const { useStationTasks } = await import('./useStationTasks')
    const { result } = renderHook(() => useStationTasks(Station.HOT_KITCHEN, 0))

    expect('selectedStatus' in result.current).toBe(false)
    expect('taskCounts' in result.current).toBe(false)
  })
})
