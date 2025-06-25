const Achievement = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
    <div className="flex items-center space-x-3">
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
        <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    </div>
)
export default Achievement