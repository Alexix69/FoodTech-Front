import { useState } from 'react';
import { StationLayout } from '../components/kitchen/StationLayout';
import { TaskList } from '../components/kitchen/TaskList';
import { useStationTasks } from '../hooks/useStationTasks';
import { Station, TaskStatus } from '../models/Task';

type Tab = 'PENDING' | 'IN_PREPARATION' | 'COMPLETED'

const TABS: { id: Tab; label: string }[] = [
  { id: 'PENDING', label: 'Pendientes' },
  { id: 'IN_PREPARATION', label: 'En Preparación' },
  { id: 'COMPLETED', label: 'Completadas' },
]

export function ColdKitchenView() {
  const [selectedTab, setSelectedTab] = useState<Tab>('PENDING')

  const {
    pendingTasks,
    inPrepTasks,
    completedTasks,
    loading,
    error,
    startingTaskId,
    completingTaskId,
    startTaskPreparation,
    completeTask,
  } = useStationTasks(Station.COLD_KITCHEN);

  const tasksByTab = {
    PENDING: pendingTasks,
    IN_PREPARATION: inPrepTasks,
    COMPLETED: completedTasks,
  }

  const tabCounts = {
    PENDING: pendingTasks.length,
    IN_PREPARATION: inPrepTasks.length,
    COMPLETED: completedTasks.length,
  }

  return (
    <StationLayout
      stationName="Estación Cocina Fría"
      stationCode="COLD_KITCHEN • Ensaladas y Postres"
      icon="ac_unit"
    >
      {error && (
        <div data-testid="kitchen-error" className="mx-10 mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400">error</span>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      {loading && pendingTasks.length === 0 && inPrepTasks.length === 0 ? (
        <div data-testid="cold-kitchen-loading" className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-primary animate-pulse mb-4">refresh</span>
            <p className="text-silver-text">Cargando tareas...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-3 px-10 py-6 overflow-x-auto border-b border-white/5 bg-charcoal/50">
            {TABS.map(tab => (
              <button
                key={tab.id}
                data-testid={`tab-${tab.id.toLowerCase().replace(/_/g, '-')}`}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-colors shrink-0 ${
                  selectedTab === tab.id
                    ? 'gold-gradient text-midnight shadow-lg shadow-primary/20'
                    : 'bg-white/5 text-silver-text hover:bg-white/10 hover:text-white-text border border-white/5'
                }`}
              >
                {tab.label}
                {tabCounts[tab.id] > 0 && (
                  <span className="ml-2 text-xs opacity-75">({tabCounts[tab.id]})</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-10 order-scroll">
            <TaskList
              tasks={tasksByTab[selectedTab]}
              onStartPreparation={startTaskPreparation}
              onCompleteTask={selectedTab === TaskStatus.IN_PREPARATION ? completeTask : undefined}
              startingTaskId={startingTaskId}
              completingTaskId={completingTaskId}
              emptyMessage={`Sin tareas ${TABS.find(t => t.id === selectedTab)?.label.toLowerCase()}`}
            />
          </div>
        </>
      )}
    </StationLayout>
  );
}
