import { CheckCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const riderFeatures = [
  "Request rides with pickup & destination",
  "View fare estimates & choose payment method",
  "Live ride tracking with driver details",
  "Ride history with filters & search",
  "Manage profile & change password",
  "SOS emergency button during rides",
]

const driverFeatures = [
  "Toggle availability (Online/Offline)",
  "Accept or reject incoming ride requests",
  "Update ride status (Picked Up → Completed)",
  "Earnings dashboard with charts",
  "View & filter ride history",
  "Manage vehicle details & profile",
]

const adminFeatures = [
  "Approve or suspend drivers",
  "Block/unblock riders",
  "View and filter all rides",
  "Analytics dashboard with charts",
  "User management with search & filters",
  "Update admin profile & password",
]

function FeatureCard({
  title,
  features,
}: {
  title: string
  features: string[]
}) {
  return (
    <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function Features() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Features by Role</h2>
          <p className="mt-2 text-muted-foreground">
            Explore what Riders, Drivers, and Admins can do in our Ride Booking Platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title=" Rider" features={riderFeatures} />
          <FeatureCard title="Driver" features={driverFeatures} />
          <FeatureCard title="Admin" features={adminFeatures} />
        </div>
      </div>
    </section>
  )
}
