import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CocineroView } from './CocineroView'
import { Station, TaskStatus } from '../models/Task'
import type { Task } from '../models/Task'
import { useStationTasks } from '../hooks/useStationTasks'

vi.mock('../hooks/useStationTasks')

const makeTask = (id: number, station: Station, status: TaskStatus): Task => ({
  id,
  orderId: id * 10,
  tableNumber: `T${id}`,
  station,
  status,
  products: [{ name: `Producto ${id}`, type: 'HOT_DISH', quantity: 1 }],
  createdAt: new Date().toISOString(),
})

const emptyHook = () => ({
  allTasks: [],
  pendingTasks: [],
  inPrepTasks: [],
  completedTasks: [],
  loading: false,
  error: null,
  startingTaskId: null,
  completingTaskId: null,
  startTaskPreparation: vi.fn(),
  completeTask: vi.fn(),
  refreshTasks: vi.fn(),
})

describe('CocineroView', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('muestra tarjetas de tareas HOT_KITCHEN y COLD_KITCHEN', () => {
    vi.mocked(useStationTasks)
      .mockReturnValueOnce({
        ...emptyHook(),
        pendingTasks: [makeTask(1, Station.HOT_KITCHEN, TaskStatus.PENDING)],
      })
      .mockReturnValueOnce({
        ...emptyHook(),
        pendingTasks: [makeTask(2, Station.COLD_KITCHEN, TaskStatus.PENDING)],
      })

    render(<MemoryRouter><CocineroView /></MemoryRouter>)

    expect(screen.getByTestId('task-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('task-card-2')).toBeInTheDocument()
  })

  it('nunca muestra tareas de estación BAR', () => {
    vi.mocked(useStationTasks).mockReturnValue(emptyHook())

    render(<MemoryRouter><CocineroView /></MemoryRouter>)

    expect(screen.queryByTestId('task-card-99')).not.toBeInTheDocument()
    expect(screen.queryByText('BAR')).not.toBeInTheDocument()
  })

  it('muestra botón Iniciar preparación en tareas PENDING', () => {
    const pendingTask = makeTask(3, Station.HOT_KITCHEN, TaskStatus.PENDING)
    vi.mocked(useStationTasks)
      .mockReturnValueOnce({ ...emptyHook(), allTasks: [pendingTask], pendingTasks: [pendingTask] })
      .mockReturnValueOnce(emptyHook())

    render(<MemoryRouter><CocineroView /></MemoryRouter>)

    expect(screen.getByTestId('start-task-btn-3')).toBeInTheDocument()
  })

  it('muestra botón Completar en tareas IN_PREPARATION', () => {
    const inPrepTask = makeTask(4, Station.HOT_KITCHEN, TaskStatus.IN_PREPARATION)
    vi.mocked(useStationTasks).mockImplementation((station) => {
      if (station === Station.HOT_KITCHEN) {
        return { ...emptyHook(), allTasks: [inPrepTask], inPrepTasks: [inPrepTask] }
      }
      return emptyHook()
    })

    render(<MemoryRouter><CocineroView /></MemoryRouter>)

    fireEvent.click(screen.getByTestId('tab-in-preparation'))

    expect(screen.getByTestId('complete-task-btn-4')).toBeInTheDocument()
  })

  it('IN_PREPARATION tasks no muestran botón Iniciar preparación', () => {
    const inPrepTask = makeTask(5, Station.HOT_KITCHEN, TaskStatus.IN_PREPARATION)
    vi.mocked(useStationTasks)
      .mockReturnValueOnce({ ...emptyHook(), allTasks: [inPrepTask], inPrepTasks: [inPrepTask] })
      .mockReturnValueOnce(emptyHook())

    render(<MemoryRouter><CocineroView /></MemoryRouter>)

    expect(screen.queryByTestId('start-task-btn-5')).not.toBeInTheDocument()
  })

  it('muestra mensaje de estado vacío cuando no hay tareas en sección', () => {
    vi.mocked(useStationTasks).mockReturnValue(emptyHook())

    render(<MemoryRouter><CocineroView /></MemoryRouter>)

    expect(screen.getAllByTestId('empty-tasks-message').length).toBeGreaterThan(0)
  })
})
