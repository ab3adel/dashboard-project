import type { AlertType } from "../interfaces";


interface alert {
    type:AlertType,
    message:string,
    id:string
}
function AlertItem({
  alert,
  onClose,
}: {
  alert: alert;
  onClose: (id: string) => void;
}) {
  const styles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div
      className={`rounded shadow p-4 flex justify-between items-start ${styles[alert.type]}`}
    >
      <span className="text-sm">{alert.message}</span>

      <button
        onClick={() => onClose(alert.id)}
        className="ml-4 font-bold"
      >
        ×
      </button>
    </div>
  );
}



export function AlertContainer({
  alerts,
  onClose,
}: {
  alerts: any[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {alerts.map(alert => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
