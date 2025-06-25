import {
    Card,
    CardContent
} from "@/components/ui/card"

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                {icon}
            </div>
        </CardContent>
    </Card>
)

export default StatCard