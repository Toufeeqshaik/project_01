import HealthDashboard from './components/HealthDashboard';
import MedicalRecordViewer from './components/MedicalRecordViewer';
import CopilotChat from './components/CopilotChat';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">AI Personal Health Copilot</h1>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Demo Mode</div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <HealthDashboard />
            <MedicalRecordViewer />
          </div>
          <div className="lg:col-span-1">
            <CopilotChat />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
