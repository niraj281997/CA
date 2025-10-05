import TaskCard from '../TaskCard';

export default function TaskCardExample() {
  const task = {
    id: '1',
    title: 'Prepare Annual Tax Return for Client ABC',
    description: 'Complete the annual tax return filing for Client ABC Corp including all schedules and forms',
    priority: 'high',
    status: 'inprogress',
    assigneeName: 'Rajesh Kumar',
    assigneeAvatar: '',
    dueDate: new Date('2025-10-15'),
    approvalStatus: 'pending',
  };

  return (
    <div className="p-6 bg-background max-w-sm">
      <TaskCard task={task} onClick={() => console.log('Task clicked')} />
    </div>
  );
}
